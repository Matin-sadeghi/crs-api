import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateProfessorData,
  ProfessorRepositoryPort,
} from 'src/professor/interface/professor.repository.port';
import { ProfessorDocument } from '../schema/professor.schema';
import { UpdateProfessorDto } from 'src/professor/dtos/professor.dto';

@Injectable()
export class ProfessorRepository implements ProfessorRepositoryPort {
  private _repository: Model<ProfessorDocument>;

  constructor(
    @InjectModel(ProfessorDocument.name) repository: Model<ProfessorDocument>,
  ) {
    this._repository = repository;
  }

  getAll(): Promise<ProfessorDocument[]> {
    return this._repository
      .find()
      .populate({ path: 'user', model: 'UserDocument' })
      .populate({ path: 'faculty', model: 'FacultyDocument' })
      .exec();
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
    return this._repository
      .findById(new Types.ObjectId(id))
      .populate({ path: 'user', model: 'UserDocument' })
      .populate({ path: 'faculty', model: 'FacultyDocument' })
      .exec();
  }

  delete(id: string): Promise<ProfessorDocument | null> {
    return this._repository.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  update(
    id: string,
    updateProfessorDto: UpdateProfessorDto,
  ): Promise<ProfessorDocument | null> {
    const { faculty, education } = updateProfessorDto;

    const updateData: Partial<ProfessorDocument> = {
      ...(typeof education === 'string' ? { education } : {}),
      ...(faculty ? { faculty: new Types.ObjectId(faculty) } : {}),
      updatedAt: new Date(),
    };

    return this._repository
      .findByIdAndUpdate(new Types.ObjectId(id), updateData, {
        new: true,
      })
      .exec();
  }
}
