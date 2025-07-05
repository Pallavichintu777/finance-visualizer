'use client';

import React, { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpenseChart from '@/components/ExpenseChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import BudgetForm from '@/components/BudgetForm';
import BudgetVsActualChart from '@/components/BudgetVsActualChart';
import SpendingInsights from '@/components/SpendingInsights';




export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const month = new Date().toISOString().slice(0, 7);
      const res = await fetch(`/api/budgets?month=${month}`);
      const text = await res.text(); 

      console.log('🔍 Raw response text from /api/budgets:', text);

      if (!res.ok) {
        console.error('Failed to fetch budgets:', res.status, text);
        return;
      }

      const data = JSON.parse(text);
      setBudgets(data);
    } catch (err) {
      console.error('JSON parsing failed:', err);
    }
  };


  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  return (
    <div className="min-h-screen bg-finance-bg bg-cover bg-fixed bg-no-repeat bg-center backdrop-blur-sm">
      <main className="p-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-extrabold text-black drop-shadow-md mb-6">💰 Personal Finance Visualizer</h1>

        <div className="w-full max-w-3xl space-y-6 bg-white/20 p-6 rounded-xl backdrop-blur-xl shadow-lg">
          <TransactionForm onAdd={fetchTransactions} />
          <TransactionList transactions={transactions} onDelete={() => fetchTransactions()} />
          <ExpenseChart transactions={transactions} />
          <CategoryPieChart transactions={transactions} />
          <BudgetForm onAdd={fetchBudgets} />
          <BudgetVsActualChart budgets={budgets} transactions={transactions} />
          <SpendingInsights transactions={transactions} budgets={budgets} />

        </div>
      </main>
    </div>
  );
}
