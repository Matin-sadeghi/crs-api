import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StudentDocument } from '../schema/student.schema';
import {
  StudentRepositoryPort,
  CreateStudentData,
} from 'src/student/interface/student.repository.port';

@Injectable()
export class StudentRepository implements StudentRepositoryPort {
  private _repository: Model<StudentDocument>;

  constructor(
    @InjectModel(StudentDocument.name) repository: Model<StudentDocument>,
  ) {
    this._repository = repository;
  }

  async create(
    createStudentData: CreateStudentData,
    _id: Types.ObjectId,
  ): Promise<StudentDocument> {
    return this._repository.create({
      ...createStudentData,
      _id,
    });
  }

  async findAll(): Promise<StudentDocument[]> {
    return this._repository.find({}).exec();
  }

  async findById(id: string): Promise<StudentDocument | null> {
    return this._repository.findById(id).exec();
  }
}
