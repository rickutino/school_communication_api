
import { IUserDTO } from "../../modules/accounts/dtos/IUserDTO";

declare global {
  namespace Express {
    interface Request {
      user: Pick<IUserDTO, "id">
    }
  }
}