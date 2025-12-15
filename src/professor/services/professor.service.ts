import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { FacultyService } from 'src/faculty/services/faculty.service';
import { UserProfessorService } from 'src/user/services/user-professor.service';
import { UserService } from 'src/user/services/user.service';
import { professorIdGenerator } from 'src/utils/id-generator';
import { HttpResponseDto } from '../../utils/util.dto';
import { ProfessorDocument } from '../database/schema/professor.schema';
import { CreateProfessorDto, UpdateProfessorDto } from '../dtos/professor.dto';
import type { ProfessorRepositoryPort } from '../interface/professor.repository.port';

@Injectable()
export class ProfessorService {
  constructor(
    @Inject('PROFESSOR_REPOSITORY')
    private readonly professorRepository: ProfessorRepositoryPort,
    private readonly userService: UserService,
    private readonly userProfessorService: UserProfessorService,
    private readonly facultyService: FacultyService,
  ) {}

  async createUser(
    createProfessorDto: CreateProfessorDto,
  ): Promise<HttpResponseDto> {
    if (createProfessorDto?.faculty) {
      const faculty = await this.facultyService.getFacultyById(
        createProfessorDto.faculty,
      );
      if (!faculty) {
        throw new BadRequestException('Faculty not found');
      }
    }
    const lastProfessor = await this.professorRepository.findLast();
    const professorId = professorIdGenerator(lastProfessor?.professorId);

    const professor = new Types.ObjectId();
    const { data } = await this.userProfessorService.createProfessorUser({
      ...createProfessorDto,
      username: professorId,
      professor,
    });
    if (!data?._id) {
      throw new BadRequestException('User not created');
    }
    await this.professorRepository.create(
      {
        faculty: createProfessorDto.faculty,
        education: createProfessorDto.education,
        professorId,
        user: data._id,
      },
      professor,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'Professor created successfully',
    };
  }

  async getAllProfessors(): Promise<ProfessorDocument[]> {
    return this.professorRepository.getAll();
  }

  async getProfessorById(id: string): Promise<ProfessorDocument> {
    const professor = await this.professorRepository.getProfessorById(id);
    if (!professor) {
      throw new NotFoundException('Professor not found');
    }
    return professor;
  }

  async deleteProfessor(id: string): Promise<HttpResponseDto> {
    const deletedProfessor = await this.professorRepository.delete(id);
    if (!deletedProfessor) {
      throw new NotFoundException('Professor not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Professor deleted successfully',
    };
  }

  async updateProfessor(
    id: string,
    updateProfessorDto: UpdateProfessorDto,
  ): Promise<HttpResponseDto> {
    const existingProfessor =
      await this.professorRepository.getProfessorById(id);
    if (!existingProfessor) {
      throw new NotFoundException('Professor not found');
    }

    if (updateProfessorDto.faculty) {
      const faculty = await this.facultyService.getFacultyById(
        updateProfessorDto.faculty,
      );
      if (!faculty) {
        throw new BadRequestException('Faculty not found');
      }
    }

    await this.userService.updateProfile(
      existingProfessor.user._id.toString(),
      updateProfessorDto,
    );

    const updatedProfessor = await this.professorRepository.update(id, {
      education: updateProfessorDto.education,
      faculty: updateProfessorDto.faculty,
    });
    if (!updatedProfessor) {
      throw new NotFoundException('Professor not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Professor updated successfully',
    };
  }
}
