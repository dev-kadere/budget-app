"use client";

import { useState, useCallback } from "react";
import { useFirebaseAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
  const { login, loginWithGoogle } = useFirebaseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(async () => {
    if (!email || !password) return;
    await login(email, password);
  }, [email, password, login]);

  const handleGoogle = useCallback(async () => {
    await loginWithGoogle();
  }, [loginWithGoogle]);

  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Welcome to <span className="text-secondary">okoa</span> Kash
      </h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-xl border border-secondary p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-xl border border-secondary p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full rounded-xl bg-secondary p-2 text-white hover:opacity-90 transition"
      >
        Login
      </button>

      <div className="flex items-center gap-3">
        <hr className="grow border-gray-300" />
        <span className="text-sm text-gray-500">or</span>
        <hr className="grow border-gray-300" />
      </div>

      <button
        onClick={handleGoogle}
        className="w-full rounded-xl border border-secondary p-2 hover:bg-secondary/10 transition"
      >
        Continue with Google
      </button>

      <p className="text-center text-sm">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
