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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/utils/enum';
import { HttpResponseDto } from 'src/utils/util.dto';
import { SectionService } from '../services/section.service';
import {
  CreateSectionDto,
  UpdateSectionDto,
  SectionResponseDto,
} from '../dtos/section.dto';
import { SectionDocument } from '../database/schema/section.schema';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/section')
@ApiBearerAuth('JWT-auth')
export class SectionController {
  constructor(
    @Inject()
    private readonly sectionService: SectionService,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all sections' })
  @ApiResponse({
    type: SectionResponseDto,
    isArray: true,
  })
  getAllSections(): Promise<SectionDocument[]> {
    return this.sectionService.getAllSections();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get one section' })
  @ApiResponse({
    type: SectionResponseDto,
  })
  getOneSection(@Param('id') id: string): Promise<SectionDocument> {
    return this.sectionService.getOneSection(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  createSection(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<HttpResponseDto> {
    return this.sectionService.createSection(createSectionDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a section' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  deleteSection(@Param('id') id: string): Promise<HttpResponseDto> {
    return this.sectionService.deleteSection(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a section' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  updateSection(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<HttpResponseDto> {
    return this.sectionService.updateSection(id, updateSectionDto);
  }
}
