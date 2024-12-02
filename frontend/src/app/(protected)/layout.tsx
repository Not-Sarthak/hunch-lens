"use client";

import { useProtectedRoute } from "src/hooks/use-protected-route";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardSkeleton } from "src/components/loading/dashboard-loading";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useProtectedRoute();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
}