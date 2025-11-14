import { UserDocument } from '../database/schema/user.schema';
import { CreateStudentDto } from '../dtos/user-student.dto';

export interface UserRepositoryPort {
  getAll(): Promise<UserDocument[]>;
  create(item: CreateStudentDto): Promise<UserDocument>;
  createStudent(item: CreateStudentDto): Promise<UserDocument>;
  findByStudentId(studentId: string): Promise<UserDocument | null>;
  findByUserId(userId: string): Promise<UserDocument | null>;
  updateTokens(id: string, accessToken: string, refreshToken: string);
  update(id: string, item: any);
}
