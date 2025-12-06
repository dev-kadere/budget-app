"use client";

import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  return <>{children}</>;
}
