"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

export default function LoadingWrapper({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loading when route changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Small delay to show loading for route changes

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
