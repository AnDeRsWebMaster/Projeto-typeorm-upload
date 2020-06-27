import AppError from '../errors/AppError';
import { getRepository } from 'typeorm'

import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction) 
    const checkCategoryExists = await transactionRepository.findOne({
      where:{category_id}
    })
  }
}

export default CreateTransactionService;
