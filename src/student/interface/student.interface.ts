import { User } from 'src/user/interface/user.interface';

export interface Student extends User {
  grade?: string;
  major?: string;
}
