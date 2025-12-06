"use client";

import { useState } from "react";
import { useFirebaseAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
  const { login, loginWithGoogle } = useFirebaseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
  };

  const handleGoogle = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 border p-6 rounded space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full p-2 rounded"
        >
          Login
        </button>

        <button onClick={handleGoogle} className="border w-full p-2 rounded">
          Continue with Google
        </button>

        <p>
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
