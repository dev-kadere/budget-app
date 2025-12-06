"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTransactions } from "@/hooks/useTransactions";

export default function AddTransactionPage() {
  const { addTransaction } = useTransactions();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !amount || !category || !date) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await addTransaction({
        title,
        amount: Number(amount),
        type,
        category,
        date,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Add Transaction</h1>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            className="border p-2 w-full rounded"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value ? Number(e.target.value) : "")
            }
          />

          <select
            className="border p-2 w-full rounded"
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            placeholder="Category"
            className="border p-2 w-full rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="date"
            className="border p-2 w-full rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white w-full p-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Saving..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
