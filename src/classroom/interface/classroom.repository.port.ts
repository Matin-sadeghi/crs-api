import { ClassroomDocument } from '../database/schema/classroom.schema';
import { CreateClassroomDto, UpdateClassroomDto } from '../dtos/classroom.dto';

export interface ClassroomRepositoryPort {
  getAll(): Promise<ClassroomDocument[]>;

  create(createClassroomDto: CreateClassroomDto): Promise<ClassroomDocument>;

  delete(id: string): Promise<ClassroomDocument | null>;

  getOne(id: string): Promise<ClassroomDocument | null>;

  getOneByRoomNumberAndFaculty(
    roomNumber: string,
    faculty: string,
  ): Promise<ClassroomDocument | null>;

  update(
    id: string,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<ClassroomDocument | null>;
}
