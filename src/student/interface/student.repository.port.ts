import { StudentDocument } from '../database/schema/student.schema';
import { Types } from 'mongoose';

export interface CreateStudentData {
  studentId: string;
  major: Types.ObjectId;
  user: Types.ObjectId;
}

export interface StudentRepositoryPort {
  create(
    createStudentData: CreateStudentData,
    _id: Types.ObjectId,
  ): Promise<StudentDocument>;

  findLast(major: string): Promise<StudentDocument | null>;

  findAll(): Promise<StudentDocument[]>;

  findById(id: string): Promise<StudentDocument | null>;

  findOneByStudentId(studentId: string): Promise<StudentDocument | null>;

  delete(id: string): Promise<StudentDocument | null>;

  update(
    id: string,
    update: Partial<StudentDocument>,
  ): Promise<StudentDocument | null>;
}
