 import AppError from '../errors/AppError';
 import {getRepository} from 'typeorm'
 import Transaction from '../models/Transaction';

interface Request{
  id: string
}
class DeleteTransactionService {
  public async execute({id}:Request): Promise<void> {
    const delRepo = getRepository(Transaction)
    try {
      const delOK = await delRepo.delete(id)

      return 
    } catch (error) {
      throw new AppError('Erro ao deletar')
    }
    
   
  }
}

export default DeleteTransactionService;
