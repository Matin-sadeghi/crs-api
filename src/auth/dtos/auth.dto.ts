import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  username!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  password!: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token to get new access token' })
  @IsString()
  @IsNotEmpty({ message: 'Refresh token is required' })
  refreshToken!: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: 'Access token' })
  @IsString()
  accessToken!: string;

  @ApiProperty({ description: 'Refresh token' })
  @IsString()
  refreshToken!: string;
}

export class ChangePasswordDto {
  @ApiProperty({ description: 'Old password' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty({ message: 'Old password is required' })
  oldPassword!: string;

  @ApiProperty({ description: 'New password' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty({ message: 'New password is required' })
  newPassword!: string;

  @ApiProperty({ description: 'Confirm new password' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty({ message: 'Confirm new password is required' })
  confirmNewPassword!: string;
}
