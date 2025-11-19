import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpResponseDto } from 'src/utils/util.dto';
import {
  ChangePasswordDto,
  LoginDto,
  LoginResponseDto,
  RefreshTokenDto,
} from '../dtos/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { User } from 'src/utils/decorators/auth.decorator';
import { UserDocument } from 'src/user/database/schema/user.schema';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user and get access token' })
  @ApiResponse({
    type: LoginResponseDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    type: LoginResponseDto,
  })
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }
  @Post('change-password')
  @ApiOperation({ summary: 'Change password' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: HttpResponseDto,
  })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @User() user: UserDocument,
  ): Promise<HttpResponseDto> {
    return this.authService.changePassword(
      changePasswordDto,
      user._id.toString(),
    );
  }
}
