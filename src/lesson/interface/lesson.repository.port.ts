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

  update(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonDocument | null>;
}
