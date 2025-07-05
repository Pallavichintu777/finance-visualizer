'use client';

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Transaction = {
  category: string;
  amount: number;
};

type Props = {
  transactions: Transaction[];
};

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const CategoryPieChart = ({ transactions }: Props) => {
  const categoryData = transactions.reduce((acc: Record<string, number>, txn) => {
    const category = txn.category || 'Uncategorized';
    if (!acc[category]) acc[category] = 0;
    acc[category] += Number(txn.amount);
    return acc;
  }, {});

  const data = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  return (
    <div className="w-full h-90 bg-white/80 border-3 border-black rounded-xl p-6 shadow-2xl hover:shadow-black transition-all duration-300">
      <h2 className="text-2xl font-extrabold text-center text-black mb-4 tracking-wide drop-shadow-md">
        🧾 Category-wise Expenses
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={85}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #000',
              color: '#000',
            }}
            labelStyle={{ color: '#000' }}
            itemStyle={{ color: '#000' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
