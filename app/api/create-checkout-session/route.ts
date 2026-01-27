import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe secret key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set');
      return NextResponse.json(
        { error: 'Stripe is not configured. Please check your environment variables.' },
        { status: 500 }
      );
    }

    const { userId, userEmail } = await request.json();

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      );
    }

    // Get product and its prices
    const productId = process.env.STRIPE_PRODUCT_ID || 'prod_TrW31WvxSZ7WQg';
    
    let priceId = process.env.STRIPE_PRICE_ID;
    let paymentMode: 'payment' | 'subscription' = 'payment';
    
    // If no price ID in env, try to get from product
    if (!priceId) {
      try {
        const product = await stripe.products.retrieve(productId);
        
        // Get all prices for this product
        const prices = await stripe.prices.list({
          product: productId,
          limit: 10,
        });
        
        // Find a one-time price first (for lifetime access)
        const oneTimePrice = prices.data.find(p => p.type === 'one_time');
        
        if (oneTimePrice) {
          priceId = oneTimePrice.id;
          paymentMode = 'payment';
        } else {
          // If no one-time price, use the first recurring price (but warn user)
          const recurringPrice = prices.data.find(p => p.type === 'recurring');
          if (recurringPrice) {
            priceId = recurringPrice.id;
            paymentMode = 'subscription';
            console.warn('Using recurring price - consider creating a one-time price for lifetime access');
          } else if (product.default_price) {
            // Fallback to default price
            if (typeof product.default_price === 'string') {
              priceId = product.default_price;
            } else if (product.default_price && typeof product.default_price === 'object') {
              priceId = product.default_price.id;
              // Check if it's recurring
              const priceDetails = await stripe.prices.retrieve(priceId);
              if (priceDetails.type === 'recurring') {
                paymentMode = 'subscription';
              }
            }
          }
        }
      } catch (error: any) {
        console.error('Error retrieving product:', error);
        return NextResponse.json(
          { error: `Failed to retrieve product: ${error.message}` },
          { status: 500 }
        );
      }
    } else {
      // If price ID is provided, check its type
      try {
        const priceDetails = await stripe.prices.retrieve(priceId);
        if (priceDetails.type === 'recurring') {
          paymentMode = 'subscription';
        }
      } catch (error) {
        // If we can't retrieve price, assume one-time
        console.warn('Could not retrieve price details, assuming one-time');
      }
    }
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'No price found for product. Please create a one-time price in Stripe or set STRIPE_PRICE_ID in .env' },
        { status: 400 }
      );
    }

    // Validate base URL format
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(baseUrl)) {
      return NextResponse.json(
        { error: 'Invalid NEXT_PUBLIC_BASE_URL format. Must be a valid URL (e.g., http://localhost:3000 or https://yourdomain.com)' },
        { status: 500 }
      );
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: paymentMode,
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/program`,
      customer_email: userEmail,
      metadata: {
        userId: userId,
        program: '21-day',
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create checkout session';
    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = `Stripe error: ${error.message}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

