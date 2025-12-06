"use client";

import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import Link from "next/link";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useFirebaseAuth();
  const router = useRouter();

  // redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Budget App</h1>
        <nav className="flex flex-col space-y-2">
          <Link
            href="/dashboard"
            className="px-2 py-1 rounded hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            href="/add-transaction"
            className="px-2 py-1 rounded hover:bg-gray-200"
          >
            Add Transaction
          </Link>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            className="px-2 py-1 rounded hover:bg-gray-200 text-red-600"
          >
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
