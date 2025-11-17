import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { UserGender, UserRole } from '../../utils/enum';

export class CreateAdminDto {
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  firstName!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  username!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  lastName!: string;

  @ApiProperty({ enum: UserGender })
  @IsEnum(UserGender)
  gender!: UserGender;

  @ApiProperty({ minLength: 10, maxLength: 20 })
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  nationalId: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiProperty({ minLength: 10, maxLength: 12 })
  @IsString()
  @MinLength(10)
  @MaxLength(12)
  phone!: string;

  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  address!: string;
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  password!: string;
}
