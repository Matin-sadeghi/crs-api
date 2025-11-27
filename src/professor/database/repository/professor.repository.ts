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
    createProfessorData: CreateProfessorData,
    _id: Types.ObjectId,
  ): Promise<ProfessorDocument> {
    return this._repository.create({
      ...createProfessorData,
      _id,
    });
  }
}
