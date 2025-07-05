import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: String,
  category: String, 
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;
