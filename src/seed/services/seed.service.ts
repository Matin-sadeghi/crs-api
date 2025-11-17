import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/database/repository/user.repository';
import { UserGender, UserRole } from 'src/utils/enum';
import { hashPassword } from 'src/utils/password';
import { HttpResponseDto } from 'src/utils/util.dto';

@Injectable()
export class SeedService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository,
  ) {}
  async createAdminUser(): Promise<HttpResponseDto> {
    const admins = await this.userRepository.getAllAdmins();
    if (admins.length > 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Admin user already exists',
      };
    }
    const hashedPassword = await hashPassword('admin');

    await this.userRepository.createAdmin({
      firstName: 'Admin',
      lastName: 'Admin',
      username: 'admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
      gender: UserGender.MALE,
      address: 'Admin',
      nationalId: '1234567890',
      phone: '1234567890',
    });
    return {
      status: HttpStatus.OK,
      message: 'Admin user created successfully',
    };
  }
}
