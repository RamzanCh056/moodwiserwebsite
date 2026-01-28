'use client';

import { ReactNode, useState } from 'react';
import { useAuth } from '@/lib/firebaseAuth';
import { useRouter } from 'next/navigation';

interface PaymentButtonProps {
  price?: string;
  className?: string;
  children?: ReactNode;
}

export default function PaymentButton({ price = '$27', className = '', children }: PaymentButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      const errorMessage = error.message || 'Failed to start payment. Please try again.';
      alert(errorMessage);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-slate-300/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className} cursor-pointer`}
    >
      {loading ? 'Processing...' : children ?? `Calm Start 21 Days (${price})`}
    </button>
  );
}

