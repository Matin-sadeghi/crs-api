import { User } from 'src/user/interface/user.interface';

export interface Professor extends User {
  department?: string;
  officeNumber?: string;
}
