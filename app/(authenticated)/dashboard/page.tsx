"use client";

import { useTransactions } from "@/hooks/useTransactions";

export default function DashboardPage() {
  const { transactions } = useTransactions();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-200 p-4 rounded text-center">
          <p className="text-lg font-semibold">Income</p>
          <p className="text-xl font-bold">ksh{income}</p>
        </div>
        <div className="bg-red-200 p-4 rounded text-center">
          <p className="text-lg font-semibold">Expenses</p>
          <p className="text-xl font-bold">ksh{expenses}</p>
        </div>
        <div className="bg-blue-200 p-4 rounded text-center">
          <p className="text-lg font-semibold">Balance</p>
          <p className="text-xl font-bold">ksh{balance}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Transactions</h2>
        {transactions.length === 0 && <p>No transactions yet.</p>}
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between p-3 border rounded bg-white"
            >
              <div>
                <p className="font-semibold">{tx.title}</p>
                <p className="text-sm text-gray-500">{tx.category}</p>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>
              <div
                className={
                  tx.type === "income"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                ksh{tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
