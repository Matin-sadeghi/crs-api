import { Controller, Post } from '@nestjs/common';
import { HttpResponseDto } from 'src/utils/util.dto';
import { SeedService } from '../services/seed.service';

@Controller('/seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('admin-user')
  createAdminUser(): Promise<HttpResponseDto> {
    return this.seedService.createAdminUser();
  }
}
