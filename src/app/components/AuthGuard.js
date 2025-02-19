// src/app/components/AuthGuard.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token || token === 'undefined') {
      router.push('/authentication/login'); 
    }
  }, [router]);

  return <>{children}</>;
}