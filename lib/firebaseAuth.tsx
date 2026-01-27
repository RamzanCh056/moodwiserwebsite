'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  hasPaidAccess: boolean;
  checkPaymentStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPaidAccess, setHasPaidAccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        await checkPaymentStatus(user.uid);
      } else {
        setHasPaidAccess(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const checkPaymentStatus = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'webpaiduser21dayprogram', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        // Check if payment is valid (you can add expiration logic here)
        const hasAccess = data.paid === true && data.program === '21-day';
        setHasPaidAccess(hasAccess);
        console.log('Payment status checked:', { userId, hasAccess, data });
      } else {
        setHasPaidAccess(false);
        console.log('No payment record found for user:', userId);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setHasPaidAccess(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Save user to Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      name: name || '',
      createdAt: serverTimestamp(),
    });
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setHasPaidAccess(false);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      resetPassword,
      hasPaidAccess,
      checkPaymentStatus: () => user ? checkPaymentStatus(user.uid) : Promise.resolve()
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

