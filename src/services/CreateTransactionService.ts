//import AppError from '../errors/AppError';
import { getRepository} from 'typeorm';
import Transaction from '../models/Transaction'; 
import Category from '../models/Category'

interface Request{
title: string,
value: number,
type: 'income'|'outcome',
category: string
}

class CreateTransactionService {
  public async execute({ title, value, type, category}:Request): Promise<Transaction> {
    const categRepo = getRepository(Category) 
    const tranRepo = getRepository(Transaction) 

    const checkCateg = await categRepo.findOne({where:{title:category}})
    if(!checkCateg){
      const categTitle = {title:category}
      const createcateg = categRepo.create(categTitle)
      const resCateg = await categRepo.save(createcateg)
      const createTran =  tranRepo.create({title, value, type,category_id:resCateg.id})
      await tranRepo.save(createTran) 

      return createTran

    }else{
      const createTran =  tranRepo.create({title, value, type, category_id:checkCateg.id})
      await tranRepo.save(createTran) 

      return createTran
    }       

  }
}

export default CreateTransactionService;
