import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../database/repository/user.repository';
import { CreateStudentDto } from '../dtos/user-student.dto';
import { HttpResponseDto } from '../../utils/util.dto';
import { UserDocument } from '../database/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}
  getAllUsers(): string {
    return 'Hello World!';
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
