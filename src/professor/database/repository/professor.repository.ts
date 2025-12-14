import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateProfessorData,
  ProfessorRepositoryPort,
} from 'src/professor/interface/professor.repository.port';
import { ProfessorDocument } from '../schema/professor.schema';

@Injectable()
export class ProfessorRepository implements ProfessorRepositoryPort {
  private _repository: Model<ProfessorDocument>;

  constructor(
    @InjectModel(ProfessorDocument.name) repository: Model<ProfessorDocument>,
  ) {
    this._repository = repository;
  }

  create(
    { faculty, ...createProfessorData }: CreateProfessorData,
    _id: Types.ObjectId,
  ): Promise<ProfessorDocument> {
    return this._repository.create({
      ...createProfessorData,
      faculty: faculty ? new Types.ObjectId(faculty) : null,
      _id,
    });
  }

  async findLast(): Promise<ProfessorDocument | null> {
    return this._repository.findOne().sort({ createdAt: -1 }).exec();
  }
  getProfessorById(id: string): Promise<ProfessorDocument | null> {
    return this._repository.findById(new Types.ObjectId(id)).exec();
  }
}
