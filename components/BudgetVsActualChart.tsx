'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type Budget = {
  category: string;
  amount: number;
  month: string;
};

type Transaction = {
  category: string;
  amount: number;
};

type Props = {
  budgets: Budget[];
  transactions: Transaction[];
};

export default function BudgetVsActualChart({ budgets, transactions }: Props) {
  const budgetMap: Record<string, number> = {};
  budgets.forEach((b) => {
    budgetMap[b.category] = b.amount;
  });

  const actualMap: Record<string, number> = {};
  transactions.forEach((t) => {
    if (!actualMap[t.category]) actualMap[t.category] = 0;
    actualMap[t.category] += Number(t.amount);
  });

  const chartData = Object.keys(budgetMap).map((category) => ({
    category,
    budget: budgetMap[category] || 0,
    actual: actualMap[category] || 0,
  }));

  return (
    <div className="bg-white/70 border-2 border-black p-4 rounded-xl shadow-lg mt-4">
      <h2 className="text-xl font-bold text-center mb-2">📈 Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#4CAF50" />
          <Bar dataKey="actual" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
