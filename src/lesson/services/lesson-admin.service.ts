import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpResponseDto } from 'src/utils/util.dto';
import { LessonDocument } from '../database/schema/lesson.schema';
import { CreateLessonDto, UpdateLessonDto } from '../dtos/lesson-admin.dto';
import type { LessonRepositoryPort } from '../interface/lesson.repository.port';

@Injectable()
export class LessonAdminService {
  constructor(
    @Inject('LESSON_REPOSITORY')
    private readonly lessonRepository: LessonRepositoryPort,
  ) {}
  getAllLessons(): Promise<LessonDocument[]> {
    return this.lessonRepository.getAll();
  }
  async getOneLesson(id: string): Promise<LessonDocument> {
    const lesson = await this.lessonRepository.getOne(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }
  async createLesson(
    createLessonDto: CreateLessonDto,
    adminUserId: string,
  ): Promise<HttpResponseDto> {
    const newLesson = await this.lessonRepository.create(
      createLessonDto,
      adminUserId,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'Lesson created successfully',
      data: newLesson,
    };
  }
  async deleteLesson(id: string): Promise<HttpResponseDto> {
    const deletedLesson = await this.lessonRepository.delete(id);
    if (!deletedLesson) throw new NotFoundException('Lesson not found');

    return {
      status: HttpStatus.OK,
      message: 'Lesson deleted successfully',
      data: deletedLesson,
    };
  }
  async updateLesson(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<HttpResponseDto> {
    const updatedLesson = await this.lessonRepository.update(
      id,
      updateLessonDto,
    );
    if (!UpdateLessonDto) throw new NotFoundException('Lesson not found');
    return {
      status: HttpStatus.OK,
      message: 'Lesson updated successfully',
      data: updatedLesson,
    };
  }
}
