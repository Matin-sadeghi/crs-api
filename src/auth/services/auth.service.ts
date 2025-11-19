/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/database/schema/user.schema';
import { UserService } from 'src/user/services/user.service';
import { ChangePasswordDto, LoginDto, RefreshTokenDto } from '../dtos/auth.dto';
import { HttpResponseDto } from 'src/utils/util.dto';
import { comparePassword, hashPassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.validateCredentials(
      loginDto.username,
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
  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: string,
  ): Promise<HttpResponseDto> {
    if (
      changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword
    ) {
      throw new BadRequestException(
        'New password and confirm new password do not match',
      );
    }
    const user = await this.userService.fetchUserById(userId);
    const isMatch = await comparePassword(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }
    const hashedPassword = await hashPassword(changePasswordDto.newPassword);
    await this.userService.updatePassword(userId, hashedPassword);
    return { status: HttpStatus.OK, message: 'Password changed successfully' };
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
            username: user.username,
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
            username: user.username,
          },
        },
        { expiresIn: '7d' },
      ),
    };
  }
}
