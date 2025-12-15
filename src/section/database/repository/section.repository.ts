import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { SectionRepositoryPort } from 'src/section/interface/section.repository.port';
import { SectionDocument, Schedule } from '../schema/section.schema';
import {
  CreateSectionDto,
  UpdateSectionDto,
} from 'src/section/dtos/section.dto';

@Injectable()
export class SectionRepository implements SectionRepositoryPort {
  private _repository: Model<SectionDocument>;

  constructor(
    @InjectModel(SectionDocument.name) repository: Model<SectionDocument>,
  ) {
    this._repository = repository;
  }

  async getAll(search: string): Promise<SectionDocument[]> {
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'professor',
          localField: 'professor',
          foreignField: '_id',
          as: 'professor',
        },
      },
      {
        $unwind: {
          path: '$professor',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: 'professor.user',
          foreignField: '_id',
          as: 'professorUser',
        },
      },
      {
        $unwind: {
          path: '$professorUser',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'classroom',
          localField: 'classroom',
          foreignField: '_id',
          as: 'classroom',
        },
      },
      {
        $unwind: {
          path: '$classroom',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'lesson',
          localField: 'lesson',
          foreignField: '_id',
          as: 'lesson',
        },
      },
      {
        $unwind: {
          path: '$lesson',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: 'students',
          foreignField: '_id',
          as: 'students',
        },
      },
    ];

    const trimmed = search?.trim();
    if (trimmed) {
      const regex = new RegExp(trimmed, 'i');
      pipeline.push({
        $match: {
          $or: [
            { 'classroom.room_number': regex },
            { 'lesson.title': regex },
            { 'lesson.lessonId': regex },
            { 'professorUser.firstName': regex },
            { 'professorUser.lastName': regex },
          ],
        },
      } as unknown as PipelineStage);
    }

    const results = await this._repository.aggregate(pipeline).exec();
    return results as SectionDocument[];
  }

  create(createSectionDto: CreateSectionDto): Promise<SectionDocument> {
    return this._repository.create({
      ...createSectionDto,
      professor: new Types.ObjectId(createSectionDto.professor),
      classroom: new Types.ObjectId(createSectionDto.classroom),
      lesson: new Types.ObjectId(createSectionDto.lesson),
      _id: new Types.ObjectId(),
    });
  }

  delete(id: string): Promise<SectionDocument | null> {
    return this._repository.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  getOne(id: string): Promise<SectionDocument | null> {
    return this._repository
      .findById(new Types.ObjectId(id))
      .populate({
        path: 'professor',
        model: 'ProfessorDocument',
        populate: {
          path: 'user',
          model: 'UserDocument',
        },
      })
      .populate({
        path: 'classroom',
        model: 'ClassroomDocument',
      })
      .populate({
        path: 'lesson',
        model: 'LessonDocument',
      })
      .populate({
        path: 'students',
        model: 'StudentDocument',
      })
      .exec();
  }

  update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionDocument | null> {
    const { professor, classroom, lesson, ...rest } = updateSectionDto;
    const updateData = {
      ...rest,
      updatedAt: new Date(),
      ...(professor && { professor: new Types.ObjectId(professor) }),
      ...(classroom && { classroom: new Types.ObjectId(classroom) }),
      ...(lesson && { lesson: new Types.ObjectId(lesson) }),
    };

    return this._repository
      .findByIdAndUpdate(new Types.ObjectId(id), updateData, { new: true })
      .populate({
        path: 'professor',
        model: 'ProfessorDocument',
        populate: {
          path: 'user',
          model: 'UserDocument',
        },
      })
      .populate({
        path: 'classroom',
        model: 'ClassroomDocument',
      })
      .populate({
        path: 'lesson',
        model: 'LessonDocument',
      })
      .populate({
        path: 'students',
        model: 'StudentDocument',
      })
      .exec();
  }

  findConflictingSections(
    classroomId: string,
    schedules: Schedule[],
    excludeSectionId?: string,
  ): Promise<SectionDocument[]> {
    const classroomObjectId = new Types.ObjectId(classroomId);
    const query: {
      classroom: Types.ObjectId;
      _id?: { $ne: Types.ObjectId };
    } = {
      classroom: classroomObjectId,
    };

    // Exclude current section if updating
    if (excludeSectionId) {
      query._id = { $ne: new Types.ObjectId(excludeSectionId) };
    }

    // Find all sections in the same classroom
    return this._repository.find(query).exec();
  }
}
