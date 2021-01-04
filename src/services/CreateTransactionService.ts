import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    let categoryExist = await categoriesRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!categoryExist) {
      categoryExist = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(categoryExist);
    }

    const { total } = await transactionsRepository.getBalance();

    if (total < value && type === 'outcome') {
      throw new AppError('There is no total enough', 400);
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: categoryExist,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
