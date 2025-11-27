import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { UserProfessorService } from 'src/user/services/user-professor.service';
import { HttpResponseDto } from '../../utils/util.dto';
import { ProfessorRepository } from '../database/repository/professor.repository';
import { CreateProfessorDto } from '../dtos/professor.dto';

@Injectable()
export class ProfessorService {
  constructor(
    @Inject('PROFESSOR_REPOSITORY')
    private readonly professorRepository: ProfessorRepository,
    private readonly userProfessorService: UserProfessorService,
  ) {}

  async createUser(
    createProfessorDto: CreateProfessorDto,
  ): Promise<HttpResponseDto> {
    const professorId = '4020250001'; // TODO: create a function to generate professorId
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
}
