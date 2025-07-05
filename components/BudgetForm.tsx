'use client';
import React, { useState } from 'react';

export default function BudgetForm({ onAdd }: { onAdd: () => void }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const month = new Date().toISOString().slice(0, 7); // "2025-07"

    await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, amount: +amount, month }),
    });

    setCategory('');
    setAmount('');
    onAdd();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/30 border-2 border-black backdrop-blur-xl rounded-xl p-6 space-y-4 text-black shadow-lg"
    >
      <h2 className="text-xl font-semibold">📊 Set Monthly Budget</h2>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full p-3 rounded-md border border-black"
      >
        <option value="">Select Category</option>
        <option value="Food">🍔 Food</option>
        <option value="Transport">🚗 Transport</option>
        <option value="Utilities">💡 Utilities</option>
        <option value="Shopping">🛍️ Shopping</option>
        <option value="Other">📦 Other</option>
      </select>

      <input
        type="number"
        placeholder="Budget Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="w-full p-3 rounded-md border border-black"
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Save Budget
      </button>
    </form>
  );
}
