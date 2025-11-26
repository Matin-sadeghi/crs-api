import { StudentDocument } from '../database/schema/student.schema';
import { Types } from 'mongoose';

export interface CreateStudentData {
  studentId: string;
  major: string;
  user: Types.ObjectId;
}

export interface StudentRepositoryPort {
  create(
    createStudentData: CreateStudentData,
    _id: Types.ObjectId,
  ): Promise<StudentDocument>;
}
