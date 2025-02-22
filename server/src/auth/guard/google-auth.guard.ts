import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    constructor(private jwtService: JwtService) {
        super();
    }

    getAuthenticateOptions(context: ExecutionContext): any {
        const request = context.switchToHttp().getRequest();
        let role = request.query.role?.toLowerCase();

        if (!['host', 'renter'].includes(role)) {
            role = 'renter';
        }

        const stateToken = this.jwtService.sign(
            { role },
            { expiresIn: '5m' },
        );

        return {
            state: stateToken,
        };
    }
}