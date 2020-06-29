import AppError from '../errors/AppError';
import { getRepository} from 'typeorm';
import Transaction from '../models/Transaction'; 
import Category from '../models/Category'
import TransactionsRepository from '../repositories/TransactionsRepository'

interface Request{
title: string,
value: number,
type: 'income'|'outcome',
category: string
}

class CreateTransactionService {
  public async execute({ title, value, type, category}:Request): Promise<Transaction> {
    const bal = new TransactionsRepository()
    const categRepo = getRepository(Category) 
    const tranRepo = getRepository(Transaction) 

    const checkSaldo = await bal.getBalance()
    if(type === 'outcome' && value > checkSaldo.total){
      throw new AppError('Saldo indisponivel')
     
    }

    let checkCateg = await categRepo.findOne({where:{title:category}})
    if(!checkCateg){
      checkCateg = categRepo.create({title:category})
      await categRepo.save(checkCateg)
    }
      const createTran =  tranRepo.create({title, value, type,category:checkCateg})
      await tranRepo.save(createTran) 

      return createTran


  }
}

export default CreateTransactionService;
