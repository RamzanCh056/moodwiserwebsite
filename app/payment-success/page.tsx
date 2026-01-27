'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/firebaseAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function PaymentSuccessPage() {
  const { user, checkPaymentStatus, hasPaidAccess } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      // Read session_id from the URL on the client side
      const sessionId =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('session_id')
          : null;
      
      if (sessionId && user) {
        try {
          // First, try to verify payment directly from Stripe
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: sessionId,
              userId: user.uid,
            }),
          });

          const data = await response.json();

          if (data.success && data.paid) {
            // Payment verified, refresh payment status
            await checkPaymentStatus();
            setLoading(false);
          } else {
            // Wait a bit more for webhook, then check again
            setTimeout(async () => {
              await checkPaymentStatus();
              setLoading(false);
            }, 3000);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          // Fallback: wait for webhook
          setTimeout(async () => {
            await checkPaymentStatus();
            setLoading(false);
          }, 3000);
        }
      } else {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [user, checkPaymentStatus]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for purchasing the 21-Day Program. You now have full access to all course content.
        </p>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {!hasPaidAccess && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-yellow-800 mb-3">Payment verified but access not granted yet. Click below to refresh.</p>
            <button
              onClick={async () => {
                setVerifying(true);
                setError(null);
                const sessionId =
                  typeof window !== 'undefined'
                    ? new URLSearchParams(window.location.search).get('session_id')
                    : null;
                if (sessionId && user) {
                  try {
                    const response = await fetch('/api/verify-payment', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        sessionId: sessionId,
                        userId: user.uid,
                      }),
                    });
                    const data = await response.json();
                    if (data.success) {
                      await checkPaymentStatus();
                      setTimeout(() => window.location.reload(), 1000);
                    } else {
                      setError('Payment verification failed. Please contact support.');
                    }
                  } catch (err) {
                    setError('Error verifying payment. Please try again.');
                  }
                }
                setVerifying(false);
              }}
              disabled={verifying}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {verifying ? 'Verifying...' : 'Verify Payment Again'}
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {hasPaidAccess ? (
            <Link
              href="/course"
              className="inline-block bg-gradient-to-r from-sky-500 to-slate-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-sky-300/50 transition-all transform hover:scale-105 cursor-pointer"
            >
              Access Course
            </Link>
          ) : (
            <button
              onClick={async () => {
                await checkPaymentStatus();
                setTimeout(() => window.location.reload(), 500);
              }}
              className="inline-block bg-gradient-to-r from-sky-500 to-slate-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-sky-300/50 transition-all transform hover:scale-105 cursor-pointer"
            >
              Refresh Access Status
            </button>
          )}
          <Link
            href="/"
            className="inline-block bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-300 transition-all cursor-pointer"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

