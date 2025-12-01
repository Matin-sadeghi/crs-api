import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateFacultyData,
  FacultyRepositoryPort,
} from 'src/faculty/interface/faculty.repository.port';
import { FacultyDocument } from '../schema/faculty.schema';

@Injectable()
export class FacultyRepository implements FacultyRepositoryPort {
  private _repository: Model<FacultyDocument>;

  constructor(
    @InjectModel(FacultyDocument.name) repository: Model<FacultyDocument>,
  ) {
    this._repository = repository;
  }

  create(
    createFacultyData: CreateFacultyData,
    _id: Types.ObjectId,
  ): Promise<FacultyDocument> {
    return this._repository.create({
      ...createFacultyData,
      _id,
    });
  }

  async findLast(): Promise<FacultyDocument | null> {
    return this._repository.findOne().sort({ createdAt: -1 }).exec();
  }
}
