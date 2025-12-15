import { SectionDocument } from '../database/schema/section.schema';
import { CreateSectionDto, UpdateSectionDto } from '../dtos/section.dto';
import { Schedule } from '../database/schema/section.schema';

export interface SectionRepositoryPort {
  getAll(): Promise<SectionDocument[]>;

  create(createSectionDto: CreateSectionDto): Promise<SectionDocument>;

  delete(id: string): Promise<SectionDocument | null>;

  getOne(id: string): Promise<SectionDocument | null>;

  update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionDocument | null>;

  searchByProfessorOrLesson(
    search: string,
  ): Promise<SectionDocument[]>;

  findConflictingSections(
    classroomId: string,
    schedules: Schedule[],
    excludeSectionId?: string,
  ): Promise<SectionDocument[]>;
}
