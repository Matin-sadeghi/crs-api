/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as bcrypt from 'bcrypt';

const DEFAULT_SALT_ROUNDS = 10;

export const hashPassword = (
  plain: string,
  saltRounds = DEFAULT_SALT_ROUNDS,
): Promise<string> => bcrypt.hash(plain, saltRounds);

export const comparePassword = (
  plain: string,
  hashed: string,
): Promise<boolean> => bcrypt.compare(plain, hashed);
