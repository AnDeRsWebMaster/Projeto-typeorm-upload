 import AppError from '../errors/AppError';
 import {getRepository} from 'typeorm'
 import Transaction from '../models/Transaction';

interface Request{
  id: string
}
class DeleteTransactionService {
  public async execute({id}:Request): Promise<void> {
    const delRepo = getRepository(Transaction)
   
      const transaction = await delRepo.findOne(id)
      if(!transaction){
        throw new AppError("Transação nao encontrada")
      }
        await delRepo.remove(transaction)
  
  }
}

export default DeleteTransactionService;
