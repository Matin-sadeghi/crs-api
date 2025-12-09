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

  async getLessonsById(ids: string[]): Promise<LessonDocument[]> {
    const lessons = await this._repository
      .find({ _id: { $in: ids.map((id) => new Types.ObjectId(id)) } })
      .exec();
    return lessons;
  }

  getOneByLessonId(lessonId: string): Promise<LessonDocument | null> {
    return this._repository.findOne({ lessonId }).exec();
  }

  getAll(): Promise<LessonDocument[]> {
    return this._repository
      .find()
      .populate({
        path: 'prerequisite',
        model: LessonDocument.name,
      })
      .exec();
  }

  create(
    createLessonDto: CreateLessonDto,
    adminUserId: string,
  ): Promise<LessonDocument> {
    const prerequisiteObjectIds = createLessonDto.prerequisite
      ? createLessonDto.prerequisite.map((id) => new Types.ObjectId(id))
      : undefined;

    return this._repository.create({
      ...createLessonDto,
      prerequisite: prerequisiteObjectIds,
      createdBy: new Types.ObjectId(adminUserId),
      _id: new Types.ObjectId(),
    });
  }

  delete(id: string): Promise<LessonDocument | null> {
    return this._repository.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  getOne(id: string): Promise<LessonDocument | null> {
    return this._repository
      .findById(new Types.ObjectId(id))
      .populate({
        path: 'prerequisite',
        model: LessonDocument.name,
      })
      .exec();
  }

  update(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonDocument | null> {
    const { prerequisite, ...rest } = updateLessonDto;
    const updateData = {
      ...rest,
      updatedAt: new Date(),
      ...(prerequisite && {
        prerequisite: prerequisite.map((id) => new Types.ObjectId(id)),
      }),
    };

    return this._repository
      .findByIdAndUpdate(new Types.ObjectId(id), updateData, { new: true })
      .populate({
        path: 'prerequisite',
        model: LessonDocument.name,
      })
      .exec();
  }
}
