import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpResponseDto } from '../../utils/util.dto';
import { CreateFacultyDto, UpdateFacultyDto } from '../dtos/faculty.dto';
import type { FacultyRepositoryPort } from '../interface/faculty.repository.port';
import { FacultyDocument } from '../database/schema/faculty.schema';

@Injectable()
export class FacultyService {
  constructor(
    @Inject('FACULTY_REPOSITORY')
    private readonly facultyRepository: FacultyRepositoryPort,
  ) {}

  async create(createFacultyDto: CreateFacultyDto): Promise<HttpResponseDto> {
    const faculty = await this.facultyRepository.findByName(
      createFacultyDto.name,
    );
    if (faculty) {
      throw new BadRequestException('Faculty already exists');
    }
    await this.facultyRepository.create({
      name: createFacultyDto.name,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Faculty created successfully',
    };
  }

  getAllFaculties(): Promise<FacultyDocument[]> {
    return this.facultyRepository.findAll();
  }

  async deleteFaculty(id: string): Promise<HttpResponseDto> {
    const deletedFaculty = await this.facultyRepository.delete(id);
    if (!deletedFaculty) {
      throw new NotFoundException('Faculty not found');
    }
    return {
      status: HttpStatus.OK,
      message: 'Faculty deleted successfully',
    };
  }
  async getFacultyById(id: string): Promise<FacultyDocument> {
    const faculty = await this.facultyRepository.findById(id);
    if (!faculty) {
      throw new NotFoundException('Faculty not found');
    }
    return faculty;
  }
  async updateFaculty(
    id: string,
    updateFacultyDto: UpdateFacultyDto,
  ): Promise<HttpResponseDto> {
    const existingFaculty = await this.facultyRepository.findById(id);
    if (!existingFaculty) {
      throw new NotFoundException('Faculty not found');
    }
    if (
      updateFacultyDto.name &&
      updateFacultyDto.name !== existingFaculty.name
    ) {
      const facultyWithSameName = await this.facultyRepository.findByName(
        updateFacultyDto.name,
      );
      if (facultyWithSameName) {
        throw new BadRequestException('Faculty name already exists');
      }
    }
    await this.facultyRepository.update(id, updateFacultyDto);
    return {
      status: HttpStatus.OK,
      message: 'Faculty updated successfully',
    };
  }
}
