import { IStudentRepository } from "src/modules/accounts/repositories/IStudentRepository";
import { connection as knex } from '../../../../../shared/infra/knex';
import { IStudentDTO } from "src/modules/accounts/dtos/IStundentDTO";

class StudentRepository implements IStudentRepository{
  async create(studentDate: IStudentDTO): Promise<void> {
    try {
      return await knex('students').insert(studentDate);
    } catch (error) {
      console.error('Erro ao criar estudante:', error);
      return undefined;
    }
  }
}

export default StudentRepository