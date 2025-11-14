import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Passport JWT strategy will handle token validation
    // This just delegates to the parent AuthGuard
    return super.canActivate(context);
  }

  handleRequest(err: Error | null, user: any): any {
    if (err) {
      throw err;
    }

    if (!user) {
      throw new UnauthorizedException('Authentication failed');
    }

    return user;
  }
}
