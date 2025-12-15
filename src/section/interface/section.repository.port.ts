import { SectionDocument } from '../database/schema/section.schema';
import { CreateSectionDto, UpdateSectionDto } from '../dtos/section.dto';
import { Schedule } from '../database/schema/section.schema';

export interface SectionRepositoryPort {
  getAll(search: string): Promise<SectionDocument[]>;

  create(createSectionDto: CreateSectionDto): Promise<SectionDocument>;

  delete(id: string): Promise<SectionDocument | null>;

  getOne(id: string): Promise<SectionDocument | null>;

  update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionDocument | null>;

  findConflictingSections(
    classroomId: string,
    schedules: Schedule[],
    excludeSectionId?: string,
  ): Promise<SectionDocument[]>;
}
