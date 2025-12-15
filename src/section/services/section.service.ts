import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClassroomService } from 'src/classroom/services/classroom.service';
import { LessonAdminService } from 'src/lesson/services/lesson-admin.service';
import { ProfessorService } from 'src/professor/services/professor.service';
import { HttpResponseDto } from 'src/utils/util.dto';
import { SectionDocument, Schedule } from '../database/schema/section.schema';
import { CreateSectionDto, UpdateSectionDto } from '../dtos/section.dto';
import type { SectionRepositoryPort } from '../interface/section.repository.port';

@Injectable()
export class SectionService {
  constructor(
    @Inject('SECTION_REPOSITORY')
    private readonly sectionRepository: SectionRepositoryPort,
    private readonly professorService: ProfessorService,
    private readonly classroomService: ClassroomService,
    private readonly lessonService: LessonAdminService,
  ) {}

  /**
   * Converts time string (HH:mm) to minutes since midnight for comparison
   */
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Checks if two time ranges overlap
   */
  private doTimeRangesOverlap(
    start1: string,
    end1: string,
    start2: string,
    end2: string,
  ): boolean {
    const start1Min = this.timeToMinutes(start1);
    const end1Min = this.timeToMinutes(end1);
    const start2Min = this.timeToMinutes(start2);
    const end2Min = this.timeToMinutes(end2);

    // Two ranges overlap if: start1 < end2 AND end1 > start2
    return start1Min < end2Min && end1Min > start2Min;
  }

  /**
   * Checks if a schedule conflicts with existing sections
   */
  private checkScheduleConflicts(
    newSchedules: Schedule[],
    existingSections: SectionDocument[],
  ): SectionDocument | null {
    for (const newSchedule of newSchedules) {
      for (const existingSection of existingSections) {
        for (const existingSchedule of existingSection.schedules) {
          // Check if same day and overlapping time
          if (
            newSchedule.day_of_week === existingSchedule.day_of_week &&
            this.doTimeRangesOverlap(
              newSchedule.start_time,
              newSchedule.endTime,
              existingSchedule.start_time,
              existingSchedule.endTime,
            )
          ) {
            return existingSection;
          }
        }
      }
    }
    return null;
  }

  async getAllSections(search: string): Promise<SectionDocument[]> {
    const sections = await this.sectionRepository.getAll(search);
    return sections;
  }

  async getOneSection(id: string): Promise<SectionDocument> {
    const section = await this.sectionRepository.getOne(id);
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    return section;
  }

  async createSection(
    createSectionDto: CreateSectionDto,
  ): Promise<HttpResponseDto> {
    // Validate professor exists
    const professor = await this.professorService.getProfessorById(
      createSectionDto.professor,
    );
    if (!professor) {
      throw new BadRequestException('Professor not found');
    }

    // Validate classroom exists

    const classroom = await this.classroomService.getOneClassroom(
      createSectionDto.classroom,
    );
    if (!classroom) {
      throw new BadRequestException('Classroom not found');
    }

    // Validate lesson exists
    const lesson = await this.lessonService.getOneLesson(
      createSectionDto.lesson,
    );
    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    // Check for scheduling conflicts in the same classroom
    // const existingSections =
    //   await this.sectionRepository.findConflictingSections(
    //     createSectionDto.classroom,
    //     createSectionDto.schedules,
    //   );

    // const conflictingSection = this.checkScheduleConflicts(
    //   createSectionDto.schedules,
    //   existingSections,
    // );

    // if (conflictingSection) {
    //   throw new BadRequestException(
    //     `Classroom is already booked at this time slot. Conflicting section ID: ${conflictingSection._id.toString()}`,
    //   );
    // }

    const newSection = await this.sectionRepository.create(createSectionDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Section created successfully',
      data: newSection,
    };
  }

  async deleteSection(id: string): Promise<HttpResponseDto> {
    const deletedSection = await this.sectionRepository.delete(id);
    if (!deletedSection) {
      throw new NotFoundException('Section not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Section deleted successfully',
      data: deletedSection,
    };
  }

  async updateSection(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<HttpResponseDto> {
    // Validate classroom if provided
    if (updateSectionDto.classroom) {
      const classroom = await this.classroomService.getOneClassroom(
        updateSectionDto.classroom,
      );
      if (!classroom) {
        throw new BadRequestException('Classroom not found');
      }
    }

    const existingSection = await this.sectionRepository.getOne(id);
    if (!existingSection) {
      throw new NotFoundException('Section not found');
    }

    // Validate professor if provided
    if (updateSectionDto.professor) {
      const professor = await this.professorService.getProfessorById(
        updateSectionDto.professor,
      );
      if (!professor) {
        throw new BadRequestException('Professor not found');
      }
    }

    // Validate lesson if provided
    if (updateSectionDto.lesson) {
      const lesson = await this.lessonService.getOneLesson(
        updateSectionDto.lesson,
      );
      if (!lesson) {
        throw new BadRequestException('Lesson not found');
      }
    }

    // Check for scheduling conflicts if classroom or schedules are being updated
    // const classroomToCheck =
    //   updateSectionDto.classroom ?? existingSection.classroom.toString();
    // const schedulesToCheck =
    //   updateSectionDto.schedules ?? existingSection.schedules;

    // const existingSections =
    //   await this.sectionRepository.findConflictingSections(
    //     classroomToCheck,
    //     schedulesToCheck,
    //     id, // Exclude current section
    //   );

    // const conflictingSection = this.checkScheduleConflicts(
    //   schedulesToCheck,
    //   existingSections,
    // );

    // if (conflictingSection) {
    //   throw new BadRequestException(
    //     `Classroom is already booked at this time slot. Conflicting section ID: ${conflictingSection._id.toString()}`,
    //   );
    // }

    const updatedSection = await this.sectionRepository.update(
      id,
      updateSectionDto,
    );
    if (!updatedSection) {
      throw new NotFoundException('Section not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Section updated successfully',
      data: updatedSection,
    };
  }
}
