import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryPort } from 'src/user/interface/user.repository.port';
import { UserDocument } from '../schema/user.schema';
import { CreateUserDto } from 'src/user/dtos/user.dto';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  private _repository: Model<UserDocument>;

  constructor(@InjectModel(UserDocument.name) repository: Model<UserDocument>) {
    this._repository = repository;
  }

  getAll(): Promise<UserDocument[]> {
    return this._repository.find().exec();
  }

  create(item: CreateUserDto): Promise<UserDocument> {
    return this._repository.create(item);
  }

  update(id: string, item: any) {
    return this._repository.findByIdAndUpdate(id, item);
  }
}
