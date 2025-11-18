import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateStudentDto } from '../dtos/user-student.dto';
import { HttpResponseDto } from '../../utils/util.dto';
import { UserDocument } from '../database/schema/user.schema';
import { comparePassword } from 'src/utils/password';
import type { UserRepositoryPort } from '../interface/user.repository.port';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryPort,
  ) {}
  async validateCredentials(
    username: string,
    password: string,
  ): Promise<UserDocument> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
  async createUser(createUserDto: CreateStudentDto): Promise<HttpResponseDto> {
    await this.userRepository.createStudent(createUserDto);
    return { status: HttpStatus.CREATED, message: 'User created successfully' };
  }
  async fetchUserById(userId: string): Promise<UserDocument> {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async updateTokens(
    id: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.updateTokens(id, accessToken, refreshToken);
  }
}
