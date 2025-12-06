"use client";

import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-4">Loading...</p>;

  return <>{user && children}</>;
}
