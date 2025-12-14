import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpResponseDto } from 'src/utils/util.dto';
import { MajorDocument } from '../database/schema/major.schema';
import { CreateMajorDto, UpdateMajorDto } from '../dtos/major.dto';
import type { MajorRepositoryPort } from '../interface/major.repository.port';

@Injectable()
export class MajorService {
  constructor(
    @Inject('MAJOR_REPOSITORY')
    private readonly majorRepository: MajorRepositoryPort,
  ) {}

  async getAllMajors(): Promise<MajorDocument[]> {
    return this.majorRepository.getAll();
  }

  async getOneMajor(id: string): Promise<MajorDocument> {
    const major = await this.majorRepository.getOne(id);
    if (!major) {
      throw new NotFoundException('Major not found');
    }
    return major;
  }

  async getOneMajorByCode(code: string): Promise<MajorDocument> {
    const major = await this.majorRepository.getOneByCode(code);
    if (!major) {
      throw new NotFoundException('Major not found');
    }
    return major;
  }

  async createMajor(createMajorDto: CreateMajorDto): Promise<HttpResponseDto> {
    const existingMajor = await this.majorRepository.getOneByCode(
      createMajorDto.code,
    );
    if (existingMajor) {
      throw new BadRequestException('Major code already exists');
    }

    const newMajor = await this.majorRepository.create(createMajorDto);

    return {
      status: HttpStatus.CREATED,
      message: 'Major created successfully',
      data: newMajor,
    };
  }

  async deleteMajor(id: string): Promise<HttpResponseDto> {
    const deletedMajor = await this.majorRepository.delete(id);
    if (!deletedMajor) {
      throw new NotFoundException('Major not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Major deleted successfully',
      data: deletedMajor,
    };
  }

  async updateMajor(
    id: string,
    updateMajorDto: UpdateMajorDto,
  ): Promise<HttpResponseDto> {
    const existingMajor = await this.majorRepository.getOne(id);
    if (!existingMajor) {
      throw new NotFoundException('Major not found');
    }

    if (updateMajorDto.code && updateMajorDto.code !== existingMajor.code) {
      const majorWithSameCode = await this.majorRepository.getOneByCode(
        updateMajorDto.code,
      );
      if (majorWithSameCode) {
        throw new BadRequestException('Major code already exists');
      }
    }

    const updatedMajor = await this.majorRepository.update(id, updateMajorDto);
    if (!updatedMajor) {
      throw new NotFoundException('Major not found');
    }

    return {
      status: HttpStatus.OK,
      message: 'Major updated successfully',
      data: updatedMajor,
    };
  }
}
