import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  studentId!: string;

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
