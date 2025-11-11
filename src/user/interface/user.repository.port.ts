import { UserDocument } from '../database/schema/user.schema';
import { CreateUserDto } from '../dtos/user.dto';

export interface UserRepositoryPort {
  getAll(): Promise<UserDocument[]>;
  create(item: CreateUserDto): Promise<UserDocument>;
  update(id: string, item: any);
}
