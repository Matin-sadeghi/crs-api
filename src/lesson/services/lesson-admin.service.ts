import {
  BadRequestException,
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SectionService } from 'src/section/services/section.service';
import { HttpResponseDto } from 'src/utils/util.dto';
import { LessonDocument } from '../database/schema/lesson.schema';
import { CreateLessonDto, UpdateLessonDto } from '../dtos/lesson-admin.dto';
import type { LessonRepositoryPort } from '../interface/lesson.repository.port';
import { StudentService } from 'src/student/services/student.service';

@Injectable()
export class LessonAdminService {
  constructor(
    @Inject('LESSON_REPOSITORY')
    private readonly lessonRepository: LessonRepositoryPort,
    @Inject(forwardRef(() => SectionService))
    private readonly sectionService: SectionService,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,
  ) {}

  async getAllLessons(): Promise<LessonDocument[]> {
    const lessons = await this.lessonRepository.getAll();
    return lessons;
  }

  async getOneLesson(id: string): Promise<LessonDocument> {
    const lesson = await this.lessonRepository.getOne(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async getOneLessonByLessonId(lessonId: string): Promise<LessonDocument> {
    const lesson = await this.lessonRepository.getOneByLessonId(lessonId);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    return lesson;
  }

  async getLessonsById(ids: string[]): Promise<LessonDocument[]> {
    return this.lessonRepository.getLessonsById(ids);
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
    const lesson = await this.lessonRepository.getOne(id);
    if (!lesson) throw new NotFoundException('Lesson not found');

    await this.sectionService.deleteAllSectionsByLessonId(id, lesson.unit);
    await this.lessonRepository.removePrerequisiteFromAllLessons(id);
    await this.studentService.removePassedLessonFromAllStudents(
      lesson._id.toString(),
    );
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

    if (existingLesson.unit !== updateLessonDto.unit) {
      const sections = await this.sectionService.findSectionWithLessonId(
        existingLesson._id.toString(),
      );
      if (sections.length > 0)
        throw new BadRequestException(
          `for chnage lesson unit , at first you should remove this lesson section ${sections.map((section) => section._id.toString()).join(', ')}`,
        );
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
      if (updateLessonDto?.prerequisite?.includes(id)) {
        throw new BadRequestException(
          'Prerequisite lesson cannot be the same as the lesson itself',
        );
      }
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
