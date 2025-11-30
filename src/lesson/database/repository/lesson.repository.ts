import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LessonRepositoryPort } from 'src/lesson/interface/lesson.repository.port';
import { LessonDocument } from '../schema/lesson.schema';
import {
  CreateLessonDto,
  UpdateLessonDto,
} from 'src/lesson/dtos/lesson-admin.dto';

@Injectable()
export class LessonRepository implements LessonRepositoryPort {
  private _repository: Model<LessonDocument>;

  constructor(
    @InjectModel(LessonDocument.name) repository: Model<LessonDocument>,
  ) {
    this._repository = repository;
  }

  getOneByLessonId(lessonId: string): Promise<LessonDocument | null> {
    return this._repository.findOne({ lessonId }).exec();
  }

  getAll(): Promise<LessonDocument[]> {
    return this._repository.find().exec();
  }

  create(
    createLessonDto: CreateLessonDto,
    adminUserId: string,
  ): Promise<LessonDocument> {
    return this._repository.create({
      ...createLessonDto,
      createdBy: new Types.ObjectId(adminUserId),
      _id: new Types.ObjectId(),
    });
  }

  delete(id: string): Promise<LessonDocument | null> {
    return this._repository.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  getOne(id: string): Promise<LessonDocument | null> {
    return this._repository.findById(new Types.ObjectId(id)).exec();
  }

  update(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonDocument | null> {
    return this._repository
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          ...updateLessonDto,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();
  }
}
