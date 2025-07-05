'use client';
import React, { useState } from 'react';

export default function TransactionForm({ onAdd }: { onAdd: () => void }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: +amount, description, date, category })
    });

    onAdd();
    setAmount('');
    setDescription('');
    setDate('');
    setCategory('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/20 backdrop-blur-lg rounded-xl p-6 shadow-md space-y-4 text-black border-2 border-black"
    >
      <input
        type="number"
        placeholder="Amount"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-md border-2 border-black bg-white/90 focus:ring-2 focus:ring-black text-black"
      />

      <input
        type="text"
        placeholder="Description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 rounded-md border-2 border-black bg-white/90 focus:ring-2 focus:ring-black text-black"
      />

      <select
        className="w-full p-3 rounded-md border-2 border-black bg-white/90 focus:outline-none focus:ring-2 focus:ring-black text-black"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Food">🍔 Food</option>
        <option value="Transport">🚗 Transport</option>
        <option value="Utilities">💡 Utilities</option>
        <option value="Shopping">🛍️ Shopping</option>
        <option value="Other">📦 Other</option>
      </select>

      <input
        type="date"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 rounded-md border-2 border-black bg-white/90 focus:ring-2 focus:ring-black text-black"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-2 rounded-md hover:scale-105 transition-transform"
      >
        Add Transaction
      </button>
    </form>
  );
}
