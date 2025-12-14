import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FacultyService } from 'src/faculty/services/faculty.service';
import { HttpResponseDto } from 'src/utils/util.dto';
import { ClassroomDocument } from '../database/schema/classroom.schema';
import { CreateClassroomDto, UpdateClassroomDto } from '../dtos/classroom.dto';
import type { ClassroomRepositoryPort } from '../interface/classroom.repository.port';

@Injectable()
export class ClassroomService {
  constructor(
    @Inject('CLASSROOM_REPOSITORY')
    private readonly classroomRepository: ClassroomRepositoryPort,
    private readonly facultyService: FacultyService,
  ) {}

  async getAllClassrooms(): Promise<ClassroomDocument[]> {
    const classrooms = await this.classroomRepository.getAll();
    return classrooms;
  }

  async getOneClassroom(id: string): Promise<ClassroomDocument> {
    const classroom = await this.classroomRepository.getOne(id);
    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }
    return classroom;
  }

  async createClassroom(
    createClassroomDto: CreateClassroomDto,
  ): Promise<HttpResponseDto> {
    const faculty = await this.facultyService.getFacultyById(
      createClassroomDto.faculty,
    );

    if (!faculty) {
      throw new BadRequestException('Faculty not found');
    }
    const classroom =
      await this.classroomRepository.getOneByRoomNumberAndFaculty(
        createClassroomDto.room_number,
        createClassroomDto.faculty,
      );
    if (classroom) {
      throw new BadRequestException('Room number already exists');
    }

    const newClassroom =
      await this.classroomRepository.create(createClassroomDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Classroom created successfully',
      data: newClassroom,
    };
  }

  async deleteClassroom(id: string): Promise<HttpResponseDto> {
    const deletedClassroom = await this.classroomRepository.delete(id);
    if (!deletedClassroom) {
      throw new NotFoundException('Classroom not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Classroom deleted successfully',
      data: deletedClassroom,
    };
  }

  async updateClassroom(
    id: string,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<HttpResponseDto> {
    const existingClassroom = await this.classroomRepository.getOne(id);
    if (!existingClassroom) {
      throw new NotFoundException('Classroom not found');
    }

    if (
      updateClassroomDto.room_number &&
      updateClassroomDto.room_number !== existingClassroom.room_number
    ) {
      const classroomWithSameRoomNumber =
        await this.classroomRepository.getOneByRoomNumberAndFaculty(
          updateClassroomDto.room_number,
          updateClassroomDto.faculty
            ? updateClassroomDto.faculty
            : existingClassroom.faculty.toString(),
        );
      if (classroomWithSameRoomNumber) {
        throw new BadRequestException('Room number already exists');
      }
    }

    const updatedClassroom = await this.classroomRepository.update(
      id,
      updateClassroomDto,
    );
    if (!updatedClassroom) {
      throw new NotFoundException('Classroom not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Classroom updated successfully',
      data: updatedClassroom,
    };
  }
}
