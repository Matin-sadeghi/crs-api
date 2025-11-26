import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { comparePassword } from 'src/utils/password';
import { UserDocument } from '../database/schema/user.schema';
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

  async fetchUserById(userId: string): Promise<UserDocument> {
    const user = await this.userRepository.findByUserId(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async updatePassword(
    userId: string,
    password: string,
  ): Promise<UserDocument | null> {
    const updatedUser = await this.userRepository.updatePassword(
      userId,
      password,
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
  async updateTokens(
    id: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userRepository.updateTokens(id, accessToken, refreshToken);
  }
}
