import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserStudentService } from 'src/user/services/user-student.service';
import { HttpResponseDto } from '../../utils/util.dto';
import { CreateStudentDto, UpdateStudentDto } from '../dtos/student.dto';
import type { StudentRepositoryPort } from '../interface/student.repository.port';
import { studentIdGenerator } from 'src/utils/id-generator';
import { MajorService } from 'src/major/services/major.service';
import { UserService } from 'src/user/services/user.service';
import { StudentDocument } from '../database/schema/student.schema';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepository: StudentRepositoryPort,
    private readonly userStudentService: UserStudentService,
    private readonly majorService: MajorService,
    private readonly userService: UserService,
  ) {}

  async createUser(
    createStudentDto: CreateStudentDto,
  ): Promise<HttpResponseDto> {
    const major = await this.majorService.getOneMajorByCode(
      createStudentDto?.majorCode,
    );

    if (!major) {
      throw new BadRequestException('Major not found');
    }
    const lastStudent = await this.studentRepository.findLast(
      major._id.toString(),
    );

    const studentId = studentIdGenerator(major.code, lastStudent?.studentId);
    const student = new Types.ObjectId();
    const { data } = await this.userStudentService.createStudentUser({
      ...createStudentDto,
      username: studentId,
      student,
    });
    if (!data?._id) {
      throw new BadRequestException('User not created');
    }
    await this.studentRepository.create(
      {
        major: major._id,
        studentId,
        user: data._id,
      },
      student,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'Student created successfully',
    };
  }

  async getAllStudents(): Promise<StudentDocument[]> {
    return this.studentRepository.findAll();
  }

  async getStudentById(id: string): Promise<StudentDocument> {
    const student = await this.studentRepository.findById(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async deleteStudent(id: string): Promise<HttpResponseDto> {
    const deletedStudent = await this.studentRepository.delete(id);
    if (!deletedStudent) {
      throw new NotFoundException('Student not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Student deleted successfully',
    };
  }

  async updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<HttpResponseDto> {
    const existingStudent = await this.studentRepository.findById(id);
    if (!existingStudent) {
      throw new NotFoundException('Student not found');
    }

    await this.userService.updateProfile(
      existingStudent.user._id.toString(),
      updateStudentDto,
    );

    const updateData: Partial<StudentDocument> = {};

    if (updateStudentDto.minUnit !== undefined) {
      updateData.minUnit = updateStudentDto.minUnit;
    }

    if (updateStudentDto.maxUnit !== undefined) {
      updateData.maxUnit = updateStudentDto.maxUnit;
    }

    if (Object.keys(updateData).length > 0) {
      await this.studentRepository.update(id, updateData);
    }

    return {
      status: HttpStatus.OK,
      message: 'Student updated successfully',
    };
  }
}
