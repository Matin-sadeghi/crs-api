import { Controller, Post } from '@nestjs/common';
import { HttpResponseDto } from 'src/utils/util.dto';
import { SeedService } from '../services/seed.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('admin-user')
  @ApiOperation({ summary: 'Create a admin user' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  createAdminUser(): Promise<HttpResponseDto> {
    return this.seedService.createAdminUser();
  }
}
