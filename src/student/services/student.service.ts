import { Injectable, Inject } from '@nestjs/common';
import { StudentRepository } from '../database/repository/student.repository';
import { CreateStudentDto } from '../dtos/student.dto';
import { HttpResponseDto } from '../../utils/util.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepository: StudentRepository,
  ) {}

  async createUser(createStudentDto: CreateStudentDto): Promise<HttpResponseDto> {
    // Just pass DTO directly — role added in repository
    await this.studentRepository.create(createStudentDto);
    return { status: 201, message: 'Student created successfully' };
  }

  async findAll() {
    return this.studentRepository.findAll();
  }

  async findById(id: string) {
    return this.studentRepository.findById(id);
  }
}
