'use client';
import React from 'react';

interface Transaction {
  amount: number;
  category: string;
}

interface Budget {
  category: string;
  amount: number;
  month: string;
}

export default function SpendingInsights({
  transactions,
  budgets,
}: {
  transactions: Transaction[];
  budgets: Budget[];
}) {
  if (!transactions.length) return null;

  
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

  
  const categoryMap: Record<string, number> = {};
  transactions.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];
  const leastCategory = Object.entries(categoryMap).sort((a, b) => a[1] - b[1])[0];

  
  const overspent = budgets.filter((b) => {
    const actual = categoryMap[b.category] || 0;
    return actual > b.amount;
  });

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow border-2 border-black text-black space-y-2">
      <h2 className="text-xl font-bold mb-2">📊 Spending Insights</h2>
      <p>🧾 Total Spent: ₹{totalSpent}</p>
      <p>🔥 Highest Category: {topCategory?.[0]} (₹{topCategory?.[1]})</p>
      <p>💤 Lowest Category: {leastCategory?.[0]} (₹{leastCategory?.[1]})</p>

      {overspent.length > 0 ? (
        <div>
          <p className="text-red-600 font-semibold mt-2">⚠️ Overspending detected in:</p>
          <ul className="list-disc list-inside">
            {overspent.map((o) => (
              <li key={o.category}>
                {o.category}: Budget ₹{o.amount}, Spent ₹{categoryMap[o.category] || 0}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-green-600 font-semibold">✅ You’re within all budgets!</p>
      )}
    </div>
  );
}
