import { container } from "tsyringe";
import { ITransactionService } from "./Transaction/ITransactionService";
import { TransactionService } from "./Transaction/implementations/TransactionService";


container.registerSingleton<ITransactionService>(
  "TransactionService",
  TransactionService
);