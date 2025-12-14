import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { hashPassword } from 'src/utils/password';
import { HttpResponseDto } from '../../utils/util.dto';
import { UserDocument } from '../database/schema/user.schema';
import { CreateProfessorUserDto } from '../dtos/user-professor.dto';
import type { UserRepositoryPort } from '../interface/user.repository.port';

@Injectable()
export class UserProfessorService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async createProfessorUser(
    createUserDto: CreateProfessorUserDto,
  ): Promise<HttpResponseDto<UserDocument>> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.userRepository.createProfessor({
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
