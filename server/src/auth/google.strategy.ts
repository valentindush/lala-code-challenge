import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:8080/api/v1/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {

    const { name, emails, photos } = profile;
    const email = emails[0].value;
    const imageUrl = photos && photos.length ? photos[0].value : null;

    const stateToken = req.query?.state;
    let role = 'RENTER';

    if (stateToken) {
      try {
        const payload = this.jwtService.verify(stateToken);
        console.log(payload)
        if (['host', 'renter'].includes(payload.role)) {
          role = payload.role.toUpperCase();
        }
      } catch (e) {
        throw new BadRequestException('Invalid Role')
      }
    }

    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: name.givenName + ' ' + name.familyName,
          role: role as UserRole,
          imageUrl
        },
      });

      await this.emailService.sendWelcomeEmail({
        email: user.email,
        name: user.name,
      });
    }

    done(null, user);
  }
}