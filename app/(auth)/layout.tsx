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

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6">{children}</div>
      <div className="hidden md:flex items-center justify-center p-6">
        <h1 className="text-6xl font-bold leading-tight capitalize">
          <span className="text-secondary">Manage</span> your <br />
          hard <span className="text-secondary">Earned</span>{" "}
          <span className="text-secondary">money</span> like a{" "}
          <span className="text-secondary">Pro</span>
        </h1>
      </div>
    </div>
  );
}
