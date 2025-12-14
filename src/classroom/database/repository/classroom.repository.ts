import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClassroomRepositoryPort } from 'src/classroom/interface/classroom.repository.port';
import { ClassroomDocument } from '../schema/classroom.schema';
import {
  CreateClassroomDto,
  UpdateClassroomDto,
} from 'src/classroom/dtos/classroom.dto';

@Injectable()
export class ClassroomRepository implements ClassroomRepositoryPort {
  private _repository: Model<ClassroomDocument>;

  constructor(
    @InjectModel(ClassroomDocument.name) repository: Model<ClassroomDocument>,
  ) {
    this._repository = repository;
  }

  getOneByRoomNumberAndFaculty(
    roomNumber: string,
    faculty: string,
  ): Promise<ClassroomDocument | null> {
    return this._repository
      .findOne({
        room_number: roomNumber,
        faculty: new Types.ObjectId(faculty),
      })
      .exec();
  }

  getAll(): Promise<ClassroomDocument[]> {
    return this._repository
      .find()
      .populate({
        path: 'faculty',
        model: 'FacultyDocument',
      })
      .exec();
  }

  create(createClassroomDto: CreateClassroomDto): Promise<ClassroomDocument> {
    return this._repository.create({
      ...createClassroomDto,
      faculty: new Types.ObjectId(createClassroomDto.faculty),
      _id: new Types.ObjectId(),
    });
  }

  delete(id: string): Promise<ClassroomDocument | null> {
    return this._repository.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  getOne(id: string): Promise<ClassroomDocument | null> {
    return this._repository
      .findById(new Types.ObjectId(id))
      .populate({
        path: 'faculty',
        model: 'FacultyDocument',
      })
      .exec();
  }

  update(
    id: string,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<ClassroomDocument | null> {
    const { faculty, ...rest } = updateClassroomDto;
    const updateData = {
      ...rest,
      updatedAt: new Date(),
      ...(faculty && {
        faculty: new Types.ObjectId(faculty),
      }),
    };

    return this._repository
      .findByIdAndUpdate(new Types.ObjectId(id), updateData, { new: true })
      .populate({
        path: 'faculty',
        model: 'FacultyDocument',
      })
      .exec();
  }
}
