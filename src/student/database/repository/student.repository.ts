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
    return this._repository
      .find({})
      .populate({ path: 'user', model: 'UserDocument' })
      .populate({ path: 'major', model: 'MajorDocument' })
      .populate({ path: 'lessonPassed', model: 'LessonDocument' })

      .exec();
  }

  async findById(id: string): Promise<StudentDocument | null> {
    return this._repository
      .findById(new Types.ObjectId(id))
      .populate({ path: 'user', model: 'UserDocument' })
      .populate({ path: 'major', model: 'MajorDocument' })
      .populate({ path: 'lessonPassed', model: 'LessonDocument' })

      .exec();
  }

  async findOneByStudentId(studentId: string): Promise<StudentDocument | null> {
    return this._repository
      .findOne({ studentId })
      .populate({ path: 'user', model: 'UserDocument' })
      .populate({ path: 'major', model: 'MajorDocument' })
      .populate({ path: 'lessonPassed', model: 'LessonDocument' })

      .exec();
  }

  async findLast(major: string): Promise<StudentDocument | null> {
    return this._repository
      .findOne({ major: new Types.ObjectId(major) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async delete(id: string): Promise<StudentDocument | null> {
    return this._repository.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  async update(
    id: string,
    update: Partial<StudentDocument>,
  ): Promise<StudentDocument | null> {
    return this._repository
      .findByIdAndUpdate(new Types.ObjectId(id), update, { new: true })
      .populate({ path: 'user', model: 'UserDocument' })
      .populate({ path: 'major', model: 'MajorDocument' })
      .exec();
  }

  async addSection(
    sectionId: string,
    studentId: string,
    lessonUnit: number,
  ): Promise<void> {
    const sectionObjectId = new Types.ObjectId(sectionId);

    await this._repository.updateOne(
      { studentId },
      { $push: { sectionTaken: sectionObjectId }, $inc: { unit: lessonUnit } },
    );
  }

  async removeSection(
    sectionId: string,
    studentId: string,
    lessonUnit: number,
  ): Promise<void> {
    await this._repository.updateOne(
      { studentId },
      {
        $pull: { sectionTaken: new Types.ObjectId(sectionId) },
        $inc: { unit: -lessonUnit },
      },
    );
  }

  async removePassedLessonFromAllStudents(lessonId: string): Promise<void> {
    await this._repository
      .updateMany(
        { lessonPassed: new Types.ObjectId(lessonId) },
        { $pull: { lessonPassed: new Types.ObjectId(lessonId) } },
      )
      .exec();
  }
}
