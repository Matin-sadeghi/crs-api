import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpResponseDto } from 'src/utils/util.dto';
import { AdminService } from '../services/admin.service';
import { CreateAdminDto } from '../dtos/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: 'Create an admin' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  create(@Body() createAdminDto: CreateAdminDto): Promise<HttpResponseDto> {
    return this.adminService.createAdmin(createAdminDto);
  }
}
