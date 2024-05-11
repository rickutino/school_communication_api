import { Knex } from 'knex';


interface ITransactionService {
  start(): Promise<Knex.Transaction>;
  commit(transaction: Knex.Transaction): Promise<void>;
  rollback(transaction: Knex.Transaction): Promise<void>;
}

export { ITransactionService }