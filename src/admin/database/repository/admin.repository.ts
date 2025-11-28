import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AdminRepositoryPort } from '../../interface/admin.repository.port';
import { AdminDocument } from '../schema/admin.schema';

@Injectable()
export class AdminRepository implements AdminRepositoryPort {
  private _repository: Model<AdminDocument>;

  constructor(
    @InjectModel(AdminDocument.name)
    repository: Model<AdminDocument>,
  ) {
    this._repository = repository;
  }

  create(data: any, _id: Types.ObjectId): Promise<AdminDocument> {
    return this._repository.create({
      ...data,
      _id,
    });
  }
}
