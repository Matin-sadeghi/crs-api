/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_ACCESS_TOKEN_SECRET') || 'secret',
    });
  }

  async validate(payload: any): Promise<any> {
    const userId: string = payload.user?._id;

    if (!userId) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.userService.fetchUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return user object - this will be set to req.user by Passport
    return user;
  }
}
