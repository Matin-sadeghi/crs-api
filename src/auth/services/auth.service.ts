/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/database/schema/user.schema';
import { UserStudentService } from 'src/user/services/user-student.service';
import { UserService } from 'src/user/services/user.service';
import { LoginDto, RefreshTokenDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = refreshTokenDto;

    try {
      // Verify the refresh token
      const secret =
        this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET') || 'secret';
      const payload = this.jwtService.verify(refreshToken, { secret });

      const userId: string = payload.user?._id;

      if (!userId) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Find user by studentId
      const user = await this.userService.fetchUserById(userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      console.log(user, refreshToken);

      // Verify the refresh token matches the one stored in database
      if (user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const newTokens = this.createLoginToken(user);

      // Update tokens in database
      await this.userService.updateTokens(
        user._id.toString(),
        newTokens.accessToken,
        newTokens.refreshToken,
      );

      return newTokens;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  createLoginToken(user: UserDocument): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.jwtService.sign(
        {
          user: {
            _id: user._id,
            role: user.role,
            status: user.status,
            firstName: user.firstName,
            lastName: user.lastName,
            studentId: user.studentId,
            teacherId: user.teacherId,
          },
        },
        { expiresIn: '1h' },
      ),
      refreshToken: this.jwtService.sign(
        {
          user: {
            _id: user._id,
            role: user.role,
            status: user.status,
            firstName: user.firstName,
            lastName: user.lastName,
            studentId: user.studentId,
            teacherId: user.teacherId,
          },
        },
        { expiresIn: '7d' },
      ),
    };
  }
}
