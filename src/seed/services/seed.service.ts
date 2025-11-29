import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import type { AdminRepositoryPort } from 'src/admin/interface/admin.repository.port';
import type { UserRepositoryPort } from 'src/user/interface/user.repository.port';
import { UserGender } from 'src/utils/enum';
import {
  adminIdGenerator,
  randomNumberStringGenerator,
} from 'src/utils/id-generator';
import { hashPassword } from 'src/utils/password';
import { HttpResponseDto } from 'src/utils/util.dto';

@Injectable()
export class SeedService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryPort,
    @Inject('ADMIN_REPOSITORY')
    private readonly adminRepository: AdminRepositoryPort,
  ) {}
  async createAdminUser(): Promise<HttpResponseDto> {
    // const admins = await this.userRepository.getAllAdmins();
    // if (admins.length > 0) {
    //   return {
    //     status: HttpStatus.BAD_REQUEST,
    //     message: 'Admin user already exists',
    //   };
    // }
    const admin = new Types.ObjectId();
    const lastAdmin = await this.adminRepository.findLast();
    const adminId = adminIdGenerator(lastAdmin?.adminId);

    const hashedPassword = await hashPassword('admin');
    const user = await this.userRepository.createAdmin({
      firstName: `Admin ${adminId}`,
      lastName: `Admin ${adminId}`,
      username: `admin`,
      password: hashedPassword,
      gender: UserGender.MALE,
      address: `Admin ${adminId}`,
      nationalId: randomNumberStringGenerator(10),
      phone: randomNumberStringGenerator(11),
      admin,
    });

    await this.adminRepository.create(
      {
        adminId,
        user: user._id,
      },
      admin,
    );
    return {
      status: HttpStatus.OK,
      message: 'Admin user created successfully',
    };
  }
}
