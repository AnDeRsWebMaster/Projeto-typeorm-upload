import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService'

import uploadConfig from '../config/upload'

const upload = multer(uploadConfig)

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const tranRepo = getRepository(Transaction);
  const bal = new TransactionsRepository();
  const transactions = await tranRepo.find();
  const balance = await bal.getBalance();

  response.status(200).json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTran = new CreateTransactionService();

  const returnTran = await createTran.execute({ title, value, type, category });
  return response.status(201).json(returnTran);

});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const createDelTran = new DeleteTransactionService()
  await createDelTran.execute({ id });
  return response.status(204).send();

});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTRansactions = new ImportTransactionsService();
    const transactions = await importTRansactions.execute(request.file.path);
    return response.json(transactions);
});

export default transactionsRouter;
