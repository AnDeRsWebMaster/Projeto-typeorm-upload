import { Router } from 'express';
import { getRepository} from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category'
//import TransactionsRepository from '../repositories/TransactionsRepository';
//import CreateTransactionService from '../services/CreateTransactionService';
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
    const categRepo= getRepository(Category) 
    const tranRepo= getRepository(Transaction) 

    const checkCateg = await categRepo.findOne({
      where:{title}
    })
    if(!checkCateg){
      const categoria = await categRepo.create({title})
      const  {id} = await categRepo.save(categoria)
      const createTran = await tranRepo.create({category_id : id,title, value, type})
      const transaction = await tranRepo.save(createTran)
      console.log(transaction)
    }
 



    //return response.status(201).json(transaction);
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
