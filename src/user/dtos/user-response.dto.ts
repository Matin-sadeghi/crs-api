import { ApiProperty } from '@nestjs/swagger';
import { UserGender, UserRole, UserStatus } from '../../utils/enum';

export class UserResponseDto {
  @ApiProperty({ type: String, description: 'User ID' })
  _id!: string;

  @ApiProperty({ description: 'Username' })
  username!: string;

  @ApiProperty({ description: 'First name' })
  firstName!: string;

  @ApiProperty({ description: 'Last name' })
  lastName!: string;

  @ApiProperty({ enum: UserRole, description: 'User role' })
  role!: UserRole;

  @ApiProperty({ enum: UserGender, description: 'User gender' })
  gender!: UserGender;

  @ApiProperty({ enum: UserStatus, description: 'User status' })
  status!: UserStatus;

  @ApiProperty({ description: 'National ID', required: false })
  nationalId?: string;

  @ApiProperty({ description: 'Phone number', required: false })
  phone?: string;

  @ApiProperty({ description: 'Address', required: false })
  address?: string;

  @ApiProperty({ type: Date, description: 'Creation date' })
  createdAt!: Date;
}
