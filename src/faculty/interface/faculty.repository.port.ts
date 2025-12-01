import { Types } from 'mongoose';
import { FacultyDocument } from '../database/schema/faculty.schema';

export interface CreateFacultyData {
  facultyId: string;
  name: string;
}

export interface FacultyRepositoryPort {
  create(
    createFacultyData: CreateFacultyData,
    _id: Types.ObjectId,
  ): Promise<FacultyDocument>;
  findLast(): Promise<FacultyDocument | null>;
}
