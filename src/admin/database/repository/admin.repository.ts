import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AdminRepositoryPort,
  CreateAdminData,
} from '../../interface/admin.repository.port';
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

  create(data: CreateAdminData, _id: Types.ObjectId): Promise<AdminDocument> {
    return this._repository.create({
      ...data,
      _id,
    });
  }

  async findLast(): Promise<AdminDocument | null> {
    return this._repository.findOne().sort({ createdAt: -1 }).exec();
  }
}
