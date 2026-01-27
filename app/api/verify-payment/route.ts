import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userId } = await request.json();

    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: 'Session ID and User ID are required' },
        { status: 400 }
      );
    }

    // Verify payment with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Check if already saved in Firebase
      const userDoc = await getDoc(doc(db, 'webpaiduser21dayprogram', userId));
      
      if (!userDoc.exists() || !userDoc.data().paid) {
        // Save to Firestore if not already saved
        await setDoc(doc(db, 'webpaiduser21dayprogram', userId), {
          paid: true,
          program: '21-day',
          stripeSessionId: session.id,
          paymentDate: new Date().toISOString(),
          amount: session.amount_total ? session.amount_total / 100 : 27,
          currency: session.currency || 'usd',
          verifiedAt: new Date().toISOString(),
        });

        return NextResponse.json({ 
          success: true, 
          paid: true,
          message: 'Payment verified and saved' 
        });
      }

      return NextResponse.json({ 
        success: true, 
        paid: true,
        message: 'Payment already verified' 
      });
    }

    return NextResponse.json({ 
      success: false, 
      paid: false,
      message: 'Payment not completed' 
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

