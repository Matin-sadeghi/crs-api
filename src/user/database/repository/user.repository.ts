import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserRepositoryPort } from 'src/user/interface/user.repository.port';
import { UserDocument } from '../schema/user.schema';
import { CreateStudentDto } from 'src/user/dtos/user-student.dto';
import { UserRole } from 'src/utils/enum';
import { CreateAdminDto } from 'src/user/dtos/user-admin.dto';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  private _repository: Model<UserDocument>;

  constructor(@InjectModel(UserDocument.name) repository: Model<UserDocument>) {
    this._repository = repository;
  }

  getAll(): Promise<UserDocument[]> {
    return this._repository.find().exec();
  }

  createAdmin(item: CreateAdminDto): Promise<UserDocument> {
    return this._repository.create({
      ...item,
      _id: new Types.ObjectId(),
      role: UserRole.ADMIN,
    });
  }
  getAllAdmins(): Promise<UserDocument[]> {
    return this._repository.find({ role: UserRole.ADMIN }).exec();
  }

  createStudent(item: CreateStudentDto): Promise<UserDocument> {
    return this._repository.create({
      ...item,
      _id: new Types.ObjectId(),
      role: UserRole.STUDENT,
    });
  }

  update(id: string, item: any) {
    return this._repository.findByIdAndUpdate(id, item);
  }
  updateTokens(id: string, accessToken: string, refreshToken: string) {
    return this._repository.findByIdAndUpdate(new Types.ObjectId(id), {
      accessToken,
      refreshToken,
    });
  }
  findByUsername(username: string): Promise<UserDocument | null> {
    return this._repository.findOne({ username });
  }

  findByUserId(userId: string): Promise<UserDocument | null> {
    return this._repository.findById(new Types.ObjectId(userId));
  }
  updatePassword(
    userId: string,
    password: string,
  ): Promise<UserDocument | null> {
    return this._repository
      .findByIdAndUpdate(new Types.ObjectId(userId), {
        password,
      })
      .exec();
  }
}
