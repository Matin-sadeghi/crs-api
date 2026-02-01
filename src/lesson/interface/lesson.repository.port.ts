import { LessonDocument } from '../database/schema/lesson.schema';
import { CreateLessonDto, UpdateLessonDto } from '../dtos/lesson-admin.dto';

export interface LessonRepositoryPort {
  getAll(): Promise<LessonDocument[]>;

  create(
    createLessonDto: CreateLessonDto,
    adminUserId: string,
  ): Promise<LessonDocument>;

  delete(id: string): Promise<LessonDocument | null>;

  getOne(id: string): Promise<LessonDocument | null>;
  getOneByLessonId(lessonId: string): Promise<LessonDocument | null>;
  getLessonsById(ids: string[]): Promise<LessonDocument[]>;

  update(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonDocument | null>;

  removePrerequisiteFromAllLessons(lessonId: string): Promise<void>;

  getLessonsWithPrerequisite(lessonId: string): Promise<LessonDocument[]>;
}
