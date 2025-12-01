import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { HttpResponseDto } from '../../utils/util.dto';
import { CreateFacultyDto } from '../dtos/faculty.dto';
import type { FacultyRepositoryPort } from '../interface/faculty.repository.port';
import { facultyIdGenerator } from 'src/utils/id-generator';

@Injectable()
export class FacultyService {
  constructor(
    @Inject('FACULTY_REPOSITORY')
    private readonly facultyRepository: FacultyRepositoryPort,
  ) {}

  async create(createFacultyDto: CreateFacultyDto): Promise<HttpResponseDto> {
    const lastFaculty = await this.facultyRepository.findLast();
    const facultyId = facultyIdGenerator('100', lastFaculty?.facultyId);

    const faculty = new Types.ObjectId();
    await this.facultyRepository.create(
      {
        name: createFacultyDto.name,
        facultyId,
      },
      faculty,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'Faculty created successfully',
    };
  }
}
