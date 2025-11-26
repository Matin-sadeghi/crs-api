import { Injectable, Inject } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { UserDocument } from '../../../user/database/schema/user.schema';
import { CreateStudentDto } from '../../dtos/student.dto';

@Injectable()
export class StudentRepository {
  constructor(
    @Inject('STUDENT_MODEL')
    private readonly studentModel: Model<UserDocument>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<UserDocument> {
    return this.studentModel.create({
      ...createStudentDto,
      _id: new Types.ObjectId(),
      role: 'STUDENT',  // Add role here
    });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.studentModel.find({ role: 'STUDENT' }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.studentModel.findById(id).exec();
  }
}
