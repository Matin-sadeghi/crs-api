import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserStudentService } from 'src/user/services/user-student.service';
import { HttpResponseDto } from '../../utils/util.dto';
import { CreateStudentDto } from '../dtos/student.dto';
import type { StudentRepositoryPort } from '../interface/student.repository.port';
import { studentIdGenerator } from 'src/utils/id-generator';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepository: StudentRepositoryPort,
    private readonly userStudentService: UserStudentService,
  ) {}

  async createUser(
    createStudentDto: CreateStudentDto,
  ): Promise<HttpResponseDto> {
    const lastStudent = await this.studentRepository.findLast();
    const studentId = studentIdGenerator('7777', lastStudent?.studentId);
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
        major: createStudentDto.major,
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
}
