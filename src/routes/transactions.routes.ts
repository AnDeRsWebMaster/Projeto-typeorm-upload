import { Router } from 'express';
import { getRepository} from 'typeorm';

import Transaction from '../models/Transaction';
//import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const tranRepo= getRepository(Transaction);
  const transactions = await tranRepo.find();

  response.status(200).json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const { title, value, type, category } = request.body; 
    const createTran = new CreateTransactionService() 

    const returnTran =  await createTran.execute({title, value, type, category})
    return response.status(201).json(returnTran);
  } catch (error) {
    console.log(error)
    throw new Error('Erro ao criar uma transação');
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
