import { FacultyDocument } from '../database/schema/faculty.schema';
import { UpdateFacultyDto } from '../dtos/faculty.dto';

export interface CreateFacultyData {
  name: string;
}

export interface FacultyRepositoryPort {
  create(createFacultyData: CreateFacultyData): Promise<FacultyDocument>;
  findByName(name: string): Promise<FacultyDocument | null>;
  findAll(): Promise<FacultyDocument[]>;
  delete(id: string): Promise<FacultyDocument | null>;
  findById(id: string): Promise<FacultyDocument | null>;
  update(
    id: string,
    updateFacultyDto: UpdateFacultyDto,
  ): Promise<FacultyDocument | null>;
  findLast(): Promise<FacultyDocument | null>;
}
