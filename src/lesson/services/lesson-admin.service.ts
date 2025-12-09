import {
  BadRequestException,
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

  async getAllLessons(): Promise<LessonDocument[]> {
    const lessons = await this.lessonRepository.getAll();
    console.log(lessons);
    return lessons;
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
    const lesson = await this.lessonRepository.getOneByLessonId(
      createLessonDto.lessonId,
    );
    if (lesson) throw new BadRequestException('Lesson ID already exists');

    if (createLessonDto.prerequisite) {
      const lessons = await this.lessonRepository.getLessonsById(
        createLessonDto.prerequisite,
      );
      if (lessons.length !== createLessonDto.prerequisite.length) {
        throw new BadRequestException('Prerequisite lessons not found');
      }
    }

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
    const existingLesson = await this.lessonRepository.getOne(id);
    if (!existingLesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (
      updateLessonDto.lessonId &&
      updateLessonDto.lessonId !== existingLesson.lessonId
    ) {
      const lessonWithSameId = await this.lessonRepository.getOneByLessonId(
        updateLessonDto.lessonId,
      );
      if (lessonWithSameId) {
        throw new BadRequestException('Lesson ID already exists');
      }
    }

    if (updateLessonDto.prerequisite) {
      const lessons = await this.lessonRepository.getLessonsById(
        updateLessonDto.prerequisite,
      );
      if (lessons.length !== updateLessonDto.prerequisite.length) {
        throw new BadRequestException('Prerequisite lessons not found');
      }
    }

    const updatedLesson = await this.lessonRepository.update(
      id,
      updateLessonDto,
    );
    if (!updatedLesson) {
      throw new NotFoundException('Lesson not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Lesson updated successfully',
      data: updatedLesson,
    };
  }
}
