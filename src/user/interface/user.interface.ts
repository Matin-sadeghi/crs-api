import { UserRole, UserGender, UserStatus } from '../../utils/enum';

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  gender: UserGender;
  status: UserStatus;
  nationalId: string;
  phone?: string;
  address?: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt: Date;
}
