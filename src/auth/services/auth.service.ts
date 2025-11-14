import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/auth.dto';
import { UserStudentService } from 'src/user/services/user-student.service';
import { UserDocument } from 'src/user/database/schema/user.schema';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userStudentService: UserStudentService,
    private readonly userService: UserService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userStudentService.loginStudent(
      loginDto.studentId,
      loginDto.password,
    );
    const tokens = this.createLoginToken(user);

    await this.userService.updateTokens(
      user._id.toString(),
      tokens.accessToken,
      tokens.refreshToken,
    );

    return tokens;
  }

  createLoginToken(user: UserDocument): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.jwtService.sign({ user }),
      refreshToken: this.jwtService.sign({ user }, { expiresIn: '3d' }),
    };
  }
}
