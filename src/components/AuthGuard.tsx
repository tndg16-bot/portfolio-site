'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => hasSupabase);
  const router = useRouter();

  useEffect(() => {
    if (!hasSupabase) return;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    let isActive = true;

    // Check current session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!isActive) return;
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch(() => {
        if (!isActive) return;
        setUser(null);
        setLoading(false);
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, [hasSupabase, supabaseAnonKey, supabaseUrl]);

  if (loading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-japan-indigo" />
      </div>
    );
  }

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return <>{children}</>;
}
