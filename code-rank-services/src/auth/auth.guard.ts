
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/constants/jwt.constant';
import { LoginTrackerService } from './services/login.tracker.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginTrackerService: LoginTrackerService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );

      // Get login session and user information
      const loginTracker_ID = payload.login_tracker_id;
      const loginSession = await this.loginTrackerService.findOne({ login_tracker_id: loginTracker_ID });
      if (!loginSession) throw new UnauthorizedException();

      // Set user information on the request object
      request['session_id'] = loginSession.login_tracker_id;
      request['user_id'] = loginSession.user.user_id;
      request['role'] = loginSession.user.role; // Assuming `role` is part of the user model
      request['user'] = loginSession.user;

      // Role check (for example, ensuring only admins can access a certain route)
      if (this.isRoleRequired(context)) {
        const requiredRole = this.getRequiredRole(context);
        if (loginSession.user.role !== requiredRole) {
          throw new ForbiddenException(`Access denied for role: ${loginSession.user.role}`);
        }
      }

    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async extractTokenFromHeader(request: Request): Promise<string | undefined> {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  // Helper function to check if a role is required
  private isRoleRequired(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const role = Reflect.getMetadata('role', handler);
    return !!role;
  }

  // Helper function to get the required role from the metadata
  private getRequiredRole(context: ExecutionContext): string {
    const handler = context.getHandler();
    return Reflect.getMetadata('role', handler);
  }
}

