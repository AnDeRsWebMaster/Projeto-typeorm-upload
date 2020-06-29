import { Router } from 'express';
import { getRepository} from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';

// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const tranRepo= getRepository(Transaction);
  const bal = new TransactionsRepository()
  const transactions = await tranRepo.find();
  const balance = await bal.getBalance()

  response.status(200).json({transactions,balance});
});

transactionsRouter.post('/', async (request, response) => {

    const { title, value, type, category } = request.body; 
    const createTran = new CreateTransactionService() 

    const returnTran =  await createTran.execute({title, value, type, category})
    return response.status(201).json(returnTran);

});

transactionsRouter.delete('/:id', async (request, response) => {
    const {id} = request.params
    const createDelTran = new DeleteTransactionService()
    await createDelTran.execute({id})
    return response.status(204).send();
  
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
