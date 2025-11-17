import { UserDocument } from '../database/schema/user.schema';
import { CreateAdminDto } from '../dtos/user-admin.dto';
import { CreateStudentDto } from '../dtos/user-student.dto';

export interface UserRepositoryPort {
  getAll(): Promise<UserDocument[]>;
  createStudent(item: CreateStudentDto): Promise<UserDocument>;
  createAdmin(item: CreateAdminDto): Promise<UserDocument>;
  getAllAdmins(): Promise<UserDocument[]>;
  findByUsername(studentId: string): Promise<UserDocument | null>;
  findByUserId(userId: string): Promise<UserDocument | null>;
  updateTokens(id: string, accessToken: string, refreshToken: string);
  update(id: string, item: any);
}
