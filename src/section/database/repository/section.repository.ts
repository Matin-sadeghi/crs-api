import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  getAll(): Promise<SectionDocument[]> {
    return this._repository
      .find()
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

  searchByProfessorOrLesson(
    search: string,
  ): Promise<SectionDocument[]> {
    const regex = new RegExp(search, 'i');

    return this._repository
      .find()
      .populate({
        path: 'professor',
        model: 'ProfessorDocument',
        populate: {
          path: 'user',
          model: 'UserDocument',
          match: {
            $or: [
              { firstName: regex },
              { lastName: regex },
            ],
          },
        },
      })
      .populate({
        path: 'classroom',
        model: 'ClassroomDocument',
      })
      .populate({
        path: 'lesson',
        model: 'LessonDocument',
        match: {
          title: regex,
        },
      })
      .populate({
        path: 'students',
        model: 'StudentDocument',
      })
      .then((sections) =>
        sections.filter(
          (section) =>
            // @ts-ignore - professor may be populated with user
            (section.professor &&
              // @ts-ignore
              section.professor.user &&
              // @ts-ignore
              (regex.test(section.professor.user.firstName) ||
                // @ts-ignore
                regex.test(section.professor.user.lastName))) ||
            (section.lesson && regex.test(
              // @ts-ignore
              section.lesson.title,
            )),
        ),
      );
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
