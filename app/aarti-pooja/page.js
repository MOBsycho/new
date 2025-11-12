'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Redirect page - /aarti-pooja now redirects to /services
 * The services page now includes all aarti, pooja, and other temple services
 */
export default function AartiPoojaRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified services page
    router.replace('/services');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-heritage-cream">
      <div className="text-center space-y-4">
        <div className="text-6xl text-sandalwood animate-pulse">ॐ</div>
        <p className="text-xl text-incense font-light">Redirecting to Services...</p>
      </div>
    </div>
  );
}
