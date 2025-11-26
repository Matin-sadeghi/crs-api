import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserStudentService } from 'src/user/services/user-student.service';
import { HttpResponseDto } from '../../utils/util.dto';
import { StudentRepository } from '../database/repository/student.repository';
import { CreateStudentDto } from '../dtos/student.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepository: StudentRepository,
    private readonly userStudentService: UserStudentService,
  ) {}

  async createUser(
    createStudentDto: CreateStudentDto,
  ): Promise<HttpResponseDto> {
    const studentId = '4020250001'; // TODO: create a function to generate studentId
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
