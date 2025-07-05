'use client';

import React from 'react';

type Transaction = {
  _id: string;
  amount: number;
  description: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
};

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold text-black">Transactions</h2>

      <ul className="space-y-2">
        {transactions && transactions.length > 0 ? (
          transactions.map((tx) => (
            <li
              key={tx._id}
              className="bg-white/30 backdrop-blur-md rounded-lg p-3 flex justify-between items-center shadow border border-black"
            >
              <div className="text-black">
                ₹{tx.amount} – {tx.description} (
                {new Date(tx.date).toLocaleDateString()})
              </div>
              <button
                onClick={() => onDelete(tx._id)}
                className="text-red-600 hover:text-red-800 transition"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-600 italic">No transactions yet.</p>
        )}
      </ul>
    </div>
  );
}
