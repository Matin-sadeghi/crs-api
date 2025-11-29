import { Types } from 'mongoose';
import { AdminDocument } from '../database/schema/admin.schema';

export interface CreateAdminData {
  adminId: string;
  user: Types.ObjectId;
}

export interface AdminRepositoryPort {
  create(
    createAdminData: CreateAdminData,
    _id: Types.ObjectId,
  ): Promise<AdminDocument>;
}
