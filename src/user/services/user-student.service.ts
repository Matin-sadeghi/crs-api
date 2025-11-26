import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { hashPassword } from 'src/utils/password';
import { HttpResponseDto } from '../../utils/util.dto';
import { UserDocument } from '../database/schema/user.schema';
import { CreateStudentUserDto } from '../dtos/user-student.dto';
import type { UserRepositoryPort } from '../interface/user.repository.port';

@Injectable()
export class UserStudentService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async createStudentUser(
    createUserDto: CreateStudentUserDto,
  ): Promise<HttpResponseDto<UserDocument>> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.userRepository.createStudent({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: user,
    };
  }
}
