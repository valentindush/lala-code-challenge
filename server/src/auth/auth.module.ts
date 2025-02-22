import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { RolesGuard } from './guard/roles.guard';

@Global()
@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleAuthGuard,
    JwtAuthGuard,
    RolesGuard
  ],
  controllers: [AuthController],
  exports: [JwtModule, JwtAuthGuard, RolesGuard]
})
export class AuthModule {}
