import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repository/user.repository';
import { CreateUserDto } from '../dtos/user.dto';
import { HttpResponseDto } from '../utils/util.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}
  getAllUsers(): string {
    return 'Hello World!';
  }
  async createUser(createUserDto: CreateUserDto): Promise<HttpResponseDto> {
    await this.userRepository.create(createUserDto);
    return { status: HttpStatus.CREATED, message: 'User created successfully' };
  }
}
