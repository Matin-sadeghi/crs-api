import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { hashPassword } from 'src/utils/password';
import { HttpResponseDto } from 'src/utils/util.dto';
import { UserDocument } from '../database/schema/user.schema';
import { CreateAdminDto } from '../dtos/user-admin.dto';  // fixed here
import type { UserRepositoryPort } from '../interface/user.repository.port';

@Injectable()
export class UserAdminService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async createAdminUser(
    createUserDto: CreateAdminDto,  // fixed here
  ): Promise<HttpResponseDto<UserDocument>> {
    const dto = createUserDto as any;

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }

    const hashedPassword = await hashPassword(dto.password);

    const user = await this.userRepository.createAdmin({
      ...dto,
      password: hashedPassword,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Admin user created successfully',
      data: user,
    };
  }
}
