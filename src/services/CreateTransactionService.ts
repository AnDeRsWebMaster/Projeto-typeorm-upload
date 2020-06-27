import AppError from '../errors/AppError';
import { getRepository } from 'typeorm'

import Transaction from '../models/Transaction'; 


interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
  category_id: string
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
    category_id
  }: Request): Promise<Transaction> {
    const tranRepo= getRepository(Transaction) 
    


    if(check){
      const tranTeste = tranRepo.create({
        id=check.id,title:check.title,value,type,category
      })
      console.log(tranTeste)
      return
    }else{
    }
return
  }
}

export default CreateTransactionService;
