import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from './guard/google-auth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { GetUser } from './decorator/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) { }

  @ApiBearerAuth()
  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@GetUser('id') id: string) {
    return this.authService.getUser(id);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const user = req.user;
      const role = req.session?.role || 'renter';
      
      const token = await this.authService.generateToken(user);
      
      return res.redirect(`${process.env.FE_URL}/auth/callback?token=${token}`);
    } catch (error) {
      return res.redirect(`${process.env.FE_URL}/auth/callback?error=authentication_failed`);
    }
  }
}
