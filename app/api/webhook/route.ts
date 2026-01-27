import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  // If webhook secret is not set, log warning but don't fail (for development)
  if (!webhookSecret) {
    console.warn('STRIPE_WEBHOOK_SECRET not set - webhook verification disabled');
    // In production, you should return an error
    // return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event: Stripe.Event;

  // Only verify signature if webhook secret is set
  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }
  } else {
    // For development/testing without webhook secret, parse the body directly
    try {
      event = JSON.parse(body) as Stripe.Event;
      console.warn('Webhook processed without signature verification (development mode)');
    } catch (err) {
      return NextResponse.json({ error: 'Invalid webhook body' }, { status: 400 });
    }
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const program = session.metadata?.program;

    if (userId && program === '21-day') {
      try {
        // Save to Firestore collection: webpaiduser21dayprogram
        await setDoc(doc(db, 'webpaiduser21dayprogram', userId), {
          paid: true,
          program: '21-day',
          stripeSessionId: session.id,
          paymentDate: new Date().toISOString(),
          amount: session.amount_total ? session.amount_total / 100 : 27, // Convert from cents
          currency: session.currency || 'usd',
        });

        console.log(`Payment confirmed for user ${userId}`);
      } catch (error) {
        console.error('Error saving payment to Firestore:', error);
        return NextResponse.json({ error: 'Failed to save payment' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}

