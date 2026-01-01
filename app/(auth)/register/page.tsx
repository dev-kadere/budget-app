"use client";

import { useState } from "react";
import { useFirebaseAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const { register } = useFirebaseAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await register(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h1 className="text-2xl font-bold text-center">Create an account</h1>

      {error && <p className="bg-red-100 text-red-700 p-2 rounded">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-xl border border-secondary p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-xl border border-secondary p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full rounded-xl border border-secondary p-2 focus:outline-none focus:ring-2 focus:ring-secondary"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        className="bg-secondary text-white w-full p-2 rounded-xl hover:bg-gray-800 transition"
      >
        {loading ? "Creating account..." : "Register"}
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
