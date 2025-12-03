import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateFacultyData,
  FacultyRepositoryPort,
} from 'src/faculty/interface/faculty.repository.port';
import { FacultyDocument } from '../schema/faculty.schema';
import { UpdateFacultyDto } from 'src/faculty/dtos/faculty.dto';

@Injectable()
export class FacultyRepository implements FacultyRepositoryPort {
  private _repository: Model<FacultyDocument>;

  constructor(
    @InjectModel(FacultyDocument.name) repository: Model<FacultyDocument>,
  ) {
    this._repository = repository;
  }

  create(createFacultyData: CreateFacultyData): Promise<FacultyDocument> {
    return this._repository.create({
      ...createFacultyData,
      _id: new Types.ObjectId(),
    });
  }

  findByName(name: string): Promise<FacultyDocument | null> {
    return this._repository.findOne({ name }).exec();
  }

  findAll(): Promise<FacultyDocument[]> {
    return this._repository.find().exec();
  }

  delete(id: string): Promise<FacultyDocument | null> {
    return this._repository.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  async findLast(): Promise<FacultyDocument | null> {
    return this._repository.findOne().sort({ createdAt: -1 }).exec();
  }

  findById(id: string): Promise<FacultyDocument | null> {
    return this._repository.findById(new Types.ObjectId(id)).exec();
  }
  update(
    id: string,
    updateFacultyDto: UpdateFacultyDto,
  ): Promise<FacultyDocument | null> {
    return this._repository
      .findByIdAndUpdate(new Types.ObjectId(id), updateFacultyDto, {
        new: true,
      })
      .exec();
  }
}
