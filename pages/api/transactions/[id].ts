import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { amount, description, date } = req.body;
    const updated = await Transaction.findByIdAndUpdate(id, { amount, description, date }, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Transaction.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.status(405).json({ message: 'Method not allowed' });
}
