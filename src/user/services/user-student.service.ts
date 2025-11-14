import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../database/repository/user.repository';
import { CreateStudentDto } from '../dtos/user-student.dto';
import { HttpResponseDto } from '../../utils/util.dto';
import { comparePassword, hashPassword } from '../../utils/password';
import { UserDocument } from '../database/schema/user.schema';

@Injectable()
export class UserStudentService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}

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

  async findByStudentId(studentId: string): Promise<UserDocument | null> {
    return this.userRepository.findByStudentId(studentId);
  }

  async loginStudent(
    studentId: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userRepository.findByStudentId(studentId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
