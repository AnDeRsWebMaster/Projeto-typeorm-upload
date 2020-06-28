// import AppError from '../errors/AppError';
interface Request{
  id: string
}
class DeleteTransactionService {
  public async execute({id}:Request): Promise<void> {
    
  }
}

export default DeleteTransactionService;
