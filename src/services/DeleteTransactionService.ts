import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionExist = await transactionsRepository.findOne({
      where: {
        id,
      },
    });

    if (!transactionExist) {
      throw new AppError(`There is no transaction with id: ${id}`);
    }

    await transactionsRepository.remove(transactionExist);
  }
}

export default DeleteTransactionService;
