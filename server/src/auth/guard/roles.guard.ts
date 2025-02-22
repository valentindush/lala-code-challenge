import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from '@prisma/client';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { ROLES_KEY } from '../decorator/roles.decorator';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: UserRole;
    };
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const user = request.user;
        if (!user) {
            throw new ForbiddenException('User not found');
        }

        return requiredRoles.includes(user.role);
    }
}
