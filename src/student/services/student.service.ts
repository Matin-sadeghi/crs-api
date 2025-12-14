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
import { MajorService } from 'src/major/services/major.service';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepository: StudentRepositoryPort,
    private readonly userStudentService: UserStudentService,
    private readonly majorService: MajorService,
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
    const lastStudent = await this.studentRepository.findLast();

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
}
