import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/utils/enum';
import { MajorService } from '../services/major.service';
import {
  CreateMajorDto,
  UpdateMajorDto,
  MajorResponseDto,
} from '../dtos/major.dto';
import { MajorDocument } from '../database/schema/major.schema';
import { HttpResponseDto } from 'src/utils/util.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/major')
@ApiBearerAuth('JWT-auth')
export class MajorController {
  constructor(
    @Inject()
    private readonly majorService: MajorService,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all majors' })
  @ApiResponse({
    type: MajorResponseDto,
    isArray: true,
  })
  getAllMajors(): Promise<MajorDocument[]> {
    return this.majorService.getAllMajors();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get one major' })
  @ApiResponse({
    type: MajorResponseDto,
  })
  getOneMajor(@Param('id') id: string): Promise<MajorDocument> {
    return this.majorService.getOneMajor(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new major' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  createMajor(
    @Body() createMajorDto: CreateMajorDto,
  ): Promise<HttpResponseDto> {
    return this.majorService.createMajor(createMajorDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a major' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  deleteMajor(@Param('id') id: string): Promise<HttpResponseDto> {
    return this.majorService.deleteMajor(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a major' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  updateMajor(
    @Param('id') id: string,
    @Body() updateMajorDto: UpdateMajorDto,
  ): Promise<HttpResponseDto> {
    return this.majorService.updateMajor(id, updateMajorDto);
  }
}
