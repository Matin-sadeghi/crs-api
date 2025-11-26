import { Injectable, Inject } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { UserDocument } from '../../../user/database/schema/user.schema';
import { CreateProfessorDto } from '../../dtos/professor.dto';

@Injectable()
export class ProfessorRepository {
  constructor(
    @Inject('PROFESSOR_MODEL')
    private readonly professorModel: Model<UserDocument>,
  ) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<UserDocument> {
    return this.professorModel.create({
      ...createProfessorDto,
      _id: new Types.ObjectId(),
      role: 'TEACHER',  // Match enum value used for professor roles
    });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.professorModel.find({ role: 'TEACHER' }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.professorModel.findById(id).exec();
  }
}
