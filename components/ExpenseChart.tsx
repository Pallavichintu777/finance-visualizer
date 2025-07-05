'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExpenseChart({ transactions }: { transactions: any[] }) {
  const monthlyTotals: { [key: string]: number } = {};

  transactions.forEach(tx => {
    const month = new Date(tx.date).toLocaleString('default', {
      month: 'short',
      year: 'numeric'
    });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + tx.amount;
  });

  const data = Object.keys(monthlyTotals).map(month => ({
    month,
    total: monthlyTotals[month]
  }));

  return (
    <div className="w-full bg-white/70 border-2 border-black rounded-xl p-4 shadow-lg mt-6">
      <h2 className="text-xl font-bold text-center text-black mb-4 drop-shadow-sm tracking-wide">
        📈 Monthly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #333' }}
            labelStyle={{ color: '#000' }}
            itemStyle={{ color: '#000' }}
          />
          <Bar
            dataKey="total"
            fill="#1d4ed8" 
            barSize={40}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
