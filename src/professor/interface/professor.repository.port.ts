import { Types } from 'mongoose';
import { ProfessorDocument } from '../database/schema/professor.schema';

export interface CreateProfessorData {
  professorId: string;
  faculty?: string;
  education: string;
  user: Types.ObjectId;
}

export interface ProfessorRepositoryPort {
  create(
    createProfessorData: CreateProfessorData,
    _id: Types.ObjectId,
  ): Promise<ProfessorDocument>;
  findLast(): Promise<ProfessorDocument | null>;
  getProfessorById(id: string): Promise<ProfessorDocument | null>;
}
