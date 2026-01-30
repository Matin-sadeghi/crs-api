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
import { StudentService } from 'src/student/services/student.service';
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
    private readonly studentService: StudentService,
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
    const existingSections =
      await this.sectionRepository.findConflictingSections(
        createSectionDto.classroom,
        createSectionDto.schedules,
      );

    const conflictingSection = this.checkScheduleConflicts(
      createSectionDto.schedules,
      existingSections,
    );

    if (conflictingSection) {
      throw new BadRequestException(
        `Classroom is already booked at this time slot. Conflicting section ID: ${conflictingSection._id.toString()}`,
      );
    }

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

  async enrollStudent(
    sectionId: string,
    studentId: string,
  ): Promise<HttpResponseDto> {
    // Get section
    const section = await this.sectionRepository.getOne(sectionId);
    if (!section) {
      throw new NotFoundException('Section not found');
    }

    // Get student by ID
    const student = await this.studentService.getStudentById(studentId);

    // Check if student is already enrolled
    const studentObjectId = student._id;
    const enrolledStudentIds = (section.students || []).map((id) =>
      id.toString(),
    );
    if (enrolledStudentIds.includes(studentObjectId.toString())) {
      throw new BadRequestException(
        'Student is already enrolled in this section',
      );
    }

    // Check that student has no other sections at the same time (schedule overlap)
    const studentSections = await this.sectionRepository.findByStudent(
      studentObjectId.toString(),
    );
    const conflictingSection = this.checkScheduleConflicts(
      section.schedules,
      studentSections,
    );
    if (conflictingSection) {
      throw new BadRequestException(
        `Student already has a section at this time. Conflicting section ID: ${conflictingSection._id.toString()}`,
      );
    }

    // Check that student does not already have this lesson in sectionTaken
    const targetLessonId = section.lesson._id.toString();
    const alreadyTakingThisLesson = studentSections.some(
      (s) => s.lesson._id.toString() === targetLessonId,
    );
    if (alreadyTakingThisLesson) {
      throw new BadRequestException(
        'Student is already enrolled in another section of this lesson.',
      );
    }

    // Check capacity
    const currentEnrollment = section.students?.length || 0;
    if (currentEnrollment + 1 > section.capacity) {
      throw new BadRequestException('Section is at full capacity');
    }

    // Get lesson from section

    const lesson = await this.lessonService.getOneLesson(
      section.lesson._id.toString(),
    );

    // Check if student already passed this lesson
    const lessonPassedIds = (student.lessonPassed || []).map((id) =>
      id.toString(),
    );
    if (lessonPassedIds.includes(lesson._id.toString())) {
      throw new BadRequestException(
        'Student has already passed this lesson. Cannot enroll in section.',
      );
    }

    // Check prerequisites
    if (lesson.prerequisite && lesson.prerequisite.length > 0) {
      const prerequisiteIds = lesson.prerequisite.map((prereqId) =>
        prereqId._id.toString(),
      );
      const missingPrerequisites = prerequisiteIds.filter(
        (prereqId) => !lessonPassedIds.includes(prereqId),
      );

      if (missingPrerequisites.length > 0) {
        const missingLessons =
          await this.lessonService.getLessonsById(missingPrerequisites);
        const missingLessonIds = missingLessons
          .map((l) => l.lessonId)
          .join(', ');
        throw new BadRequestException(
          `Student has not passed all prerequisites. Missing: ${missingLessonIds}`,
        );
      }
    }

    if (student.unit + lesson.unit > student.maxUnit)
      throw new BadRequestException(`you can get ${student.maxUnit} unit`);

    // Add student to section using repository method
    section.students.push(student._id);
    await this.sectionRepository.addStudentToSection(
      sectionId,
      studentObjectId.toString(),
    );

    await this.studentService.addSection(
      sectionId,
      student.studentId,
      lesson.unit,
    );

    return {
      status: HttpStatus.OK,
      message: 'Student enrolled in section successfully',
    };
  }
  getSectionsByProfessor(professorId: string): Promise<SectionDocument[]> {
    return this.sectionRepository.findByProfessor(professorId);
  }
  getSectionsByStudent(studentId: string): Promise<SectionDocument[]> {
    return this.sectionRepository.findByStudent(studentId);
  }
  async removeStudentFromSection(
    sectionId: string,
    studentId: string,
    professorId: string,
  ): Promise<HttpResponseDto> {
    const section = await this.sectionRepository.getOne(sectionId);
    if (!section) {
      throw new NotFoundException('Section not found');
    }

    if (section.professor._id.toString() !== professorId) {
      throw new BadRequestException(
        'You are not allowed to modify this section',
      );
    }

    const student = await this.studentService.getStudentById(studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const isEnrolled = section.students
      .map((s) => s._id.toString())
      .includes(student._id.toString());

    if (!isEnrolled) {
      throw new BadRequestException('Student is not enrolled in this section');
    }

    const lesson = await this.lessonService.getOneLesson(
      section.lesson._id.toString(),
    );

    await this.sectionRepository.removeStudentFromSection(sectionId, studentId);

    await this.studentService.removeSection(
      sectionId,
      student.studentId,
      lesson.unit,
    );

    return {
      status: HttpStatus.OK,
      message: 'Student removed from section successfully',
    };
  }

  async studentDropSection(
    sectionId: string,
    studentId: string,
  ): Promise<HttpResponseDto> {
    const section = await this.sectionRepository.getOne(sectionId);
    if (!section) {
      throw new NotFoundException('Section not found');
    }

    const student = await this.studentService.getStudentById(studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const isEnrolled = section.students
      .map((s) => s._id.toString())
      .includes(student._id.toString());

    if (!isEnrolled) {
      throw new BadRequestException('You are not enrolled in this section');
    }

    const lesson = await this.lessonService.getOneLesson(
      section.lesson._id.toString(),
    );

    await this.sectionRepository.removeStudentFromSection(sectionId, studentId);

    await this.studentService.removeSection(
      sectionId,
      student.studentId,
      lesson.unit,
    );

    return {
      status: HttpStatus.OK,
      message: 'Section dropped successfully',
    };
  }
}
