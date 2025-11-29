import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserAdminService } from 'src/user/services/user-admin.service';
import { HttpResponseDto } from '../../utils/util.dto';
import { CreateAdminDto } from '../dtos/admin.dto';
import type { AdminRepositoryPort } from '../interface/admin.repository.port';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private readonly adminRepository: AdminRepositoryPort,
    private readonly userAdminService: UserAdminService,
  ) {}

  async createUser(createAdminDto: CreateAdminDto): Promise<HttpResponseDto> {
    const adminId = '4010250001'; // TODO: generate admin ID dynamically
    const admin = new Types.ObjectId();

    const { data } = await this.userAdminService.createAdminUser({
      ...createAdminDto,
      admin,
      username: createAdminDto.firstName,
    });

    if (!data?._id) {
      throw new BadRequestException('User not created');
    }

    await this.adminRepository.create(
      {
        adminId,
        user: data._id,
      },
      admin,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'Admin created successfully',
    };
  }
}
