import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    return res.status(500).json({ error: 'Failed to connect to database' });
  }

  try {
    if (req.method === 'GET') {
      const transactions = await Transaction.find().sort({ date: -1 });
      return res.status(200).json(transactions);
    }

    if (req.method === 'POST') {
      const { amount, description, date, category } = req.body;

      if (!amount || !description || !date || !category) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const newTransaction = new Transaction({
        amount,
        description,
        date,
        category,
      });

      await newTransaction.save();
      return res.status(201).json(newTransaction);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('❌ Transaction route error:', error);
    return res.status(500).json({ error: 'Something went wrong in the transaction API' });
  }
}
