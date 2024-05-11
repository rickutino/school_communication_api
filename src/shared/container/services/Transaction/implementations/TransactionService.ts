
import { injectable } from "tsyringe";
import { connection as knex } from '../../../../../shared/infra/knex';
import { ITransactionService } from "../ITransactionService";
import { Knex } from "knex";

@injectable()
class TransactionService implements ITransactionService{
  async start() {
    try {
      const transaction = await knex.transaction();
      return transaction;
    } catch (error: any) {
      throw new Error("Failed to start transaction: " + error.message);
    }
  }

  async commit(transaction: Knex.Transaction) {
    try {
      await transaction.commit();
    } catch (error: any) {
      await transaction.rollback();
      throw new Error("Failed to commit transaction: " + error.message);
    }
  }

  async rollback(transaction: Knex.Transaction) {
    try {
      await transaction.rollback();
    } catch (error: any) {
      throw new Error("Failed to rollback transaction: " + error.message);
    }
  }
}

export { TransactionService };
