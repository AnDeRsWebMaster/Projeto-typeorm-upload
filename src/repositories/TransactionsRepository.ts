import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    //   const repository = new Repository();
    //   const ResBalance = repository.find();
    //   const balance = ResBalance.reduce(
    //     (acc, elem) => {
    //       if (acc.type === 'income') {
    //         acc.income += elem.value;
    //       }
    //       if (acc.type === 'outcome') {
    //         acc.outcome += elem.value;
    //       }
    //       return {
    //         income: acc.income,
    //         outcome: acc.outcome,
    //         total: acc.income - acc.outcome,
    //       };
    //     },
    //     {
    //       income,
    //       outcome,
    //       total,
    //     },
    //   );
    //   return balance;
  }
}

export default TransactionsRepository;
