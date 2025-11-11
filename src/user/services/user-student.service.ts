import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repository/user.repository';
import { CreateStudentDto } from '../dtos/user-student.dto';
import { HttpResponseDto } from '../utils/util.dto';
import { hashPassword } from '../utils/password';

@Injectable()
export class UserStudentService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}
  getAllUsers(): string {
    return 'Hello World!';
  }
  async createUserStudent(
    createStudentDto: CreateStudentDto,
  ): Promise<HttpResponseDto> {
    const hashedPassword = await hashPassword(createStudentDto.password);
    await this.userRepository.createStudent({
      ...createStudentDto,
      password: hashedPassword,
    });
    return { status: HttpStatus.CREATED, message: 'User created successfully' };
  }
}
