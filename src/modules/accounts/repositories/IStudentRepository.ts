import { IStudentDTO } from "../dtos/IStundentDTO";

interface IStudentRepository {
  create(studentDate: IStudentDTO): Promise<void>;
}

export { IStudentRepository }