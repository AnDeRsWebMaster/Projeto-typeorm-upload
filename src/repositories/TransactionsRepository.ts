import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {

  public async getBalance(): Promise<Balance> {
      const repository = getRepository(Transaction)
      const ResBalance = await repository.find();
      const balance = ResBalance.reduce(
        (acc, elem) => {
  
          if (elem.type === 'income') {
            acc.income += elem.value;
          }
          if (elem.type === 'outcome') {
            acc.outcome += elem.value;
          }

          return {
            income: acc.income,
            outcome: acc.outcome,
            total: acc.income - acc.outcome,
          };
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      );
      return balance;
  }
}

export default TransactionsRepository;
