"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import { useFirebaseAuth } from "./useAuth";
import { Transaction } from "@/lib/models/transaction";

export const useTransactions = () => {
  const { user } = useFirebaseAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = async (data: Omit<Transaction, "id" | "userId">) => {
    if (!user) throw new Error("User not logged in");

    try {
      await addDoc(collection(db, "transactions"), {
        ...data,
        userId: user.uid,
      });
    } catch (err: any) {
      console.error("Failed to add transaction:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];

      setTransactions(results);
    });

    return () => unsubscribe();
  }, [user]);

  return { transactions, addTransaction };
};
