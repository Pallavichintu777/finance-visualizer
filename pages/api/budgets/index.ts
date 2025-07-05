
import { connectDB } from '@/lib/mongodb'; 
import Budget from '@/models/Budget';     
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const month = req.query.month as string;

    try {
      const budgets = await Budget.find({ month });
      return res.status(200).json(budgets);
    } catch (err) {
      return res.status(500).json({ error: 'Error fetching budgets' });
    }
  }

  if (req.method === 'POST') {
    const { category, amount, month } = req.body;

    try {
      const newBudget = new Budget({ category, amount, month });
      await newBudget.save();
      return res.status(201).json(newBudget);
    } catch (err) {
      return res.status(500).json({ error: 'Error saving budget' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
