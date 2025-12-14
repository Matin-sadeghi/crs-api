import { MajorDocument } from '../database/schema/major.schema';
import { CreateMajorDto, UpdateMajorDto } from '../dtos/major.dto';

export interface MajorRepositoryPort {
  getAll(): Promise<MajorDocument[]>;
  create(createMajorDto: CreateMajorDto): Promise<MajorDocument>;
  delete(id: string): Promise<MajorDocument | null>;
  getOne(id: string): Promise<MajorDocument | null>;
  getOneByCode(code: string): Promise<MajorDocument | null>;
  update(
    id: string,
    updateMajorDto: UpdateMajorDto,
  ): Promise<MajorDocument | null>;
}
