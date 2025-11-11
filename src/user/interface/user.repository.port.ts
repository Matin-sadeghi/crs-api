import { UserDocument } from '../database/schema/user.schema';
import { CreateStudentDto } from '../dtos/user-student.dto';

export interface UserRepositoryPort {
  getAll(): Promise<UserDocument[]>;
  create(item: CreateStudentDto): Promise<UserDocument>;
  createStudent(item: CreateStudentDto): Promise<UserDocument>;
  update(id: string, item: any);
}
