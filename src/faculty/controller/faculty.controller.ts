import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpResponseDto } from 'src/utils/util.dto';
import { FacultyService } from '../services/faculty.service';
import { CreateFacultyDto } from '../dtos/faculty.dto';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a faculty' })
  @ApiResponse({
    type: HttpResponseDto,
  })
  create(@Body() dto: CreateFacultyDto): Promise<HttpResponseDto> {
    return this.facultyService.create(dto);
  }
}
