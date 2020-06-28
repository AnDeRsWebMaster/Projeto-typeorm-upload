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

    const checkCateg = await categRepo.findOne({where:{title:category}})
    if(!checkCateg){
      const categTitle = {title:category}
      const createcateg = categRepo.create(categTitle)
      const resCateg = await categRepo.save(createcateg)
      const createTran =  tranRepo.create({title, value, type,category:resCateg.id})
      await tranRepo.save(createTran) 

      return createTran

    }else{
      const createTran =  tranRepo.create({title, value, type, category:checkCateg.id})
      await tranRepo.save(createTran) 

      return createTran
    }       

  }
}

export default CreateTransactionService;
