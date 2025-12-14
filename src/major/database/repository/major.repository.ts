import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MajorRepositoryPort } from 'src/major/interface/major.repository.port';
import { MajorDocument } from '../schema/major.schema';
import { CreateMajorDto, UpdateMajorDto } from 'src/major/dtos/major.dto';

@Injectable()
export class MajorRepository implements MajorRepositoryPort {
  private _repository: Model<MajorDocument>;

  constructor(
    @InjectModel(MajorDocument.name) repository: Model<MajorDocument>,
  ) {
    this._repository = repository;
  }

  getAll(): Promise<MajorDocument[]> {
    return this._repository.find().exec();
  }

  create(createMajorDto: CreateMajorDto): Promise<MajorDocument> {
    return this._repository.create({
      ...createMajorDto,
      _id: new Types.ObjectId(),
    });
  }

  delete(id: string): Promise<MajorDocument | null> {
    return this._repository.findByIdAndDelete(new Types.ObjectId(id)).exec();
  }

  getOne(id: string): Promise<MajorDocument | null> {
    return this._repository.findById(new Types.ObjectId(id)).exec();
  }

  getOneByCode(code: string): Promise<MajorDocument | null> {
    return this._repository.findOne({ code }).exec();
  }

  update(
    id: string,
    updateMajorDto: UpdateMajorDto,
  ): Promise<MajorDocument | null> {
    return this._repository
      .findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          ...updateMajorDto,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();
  }
}
