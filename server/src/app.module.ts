import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from './properties/properties.module';
import { BookingsModule } from './bookings/bookings.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { FileModule } from './file/file.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
        secure: false,
      },
      defaults: {
        from: '"Lala" <no-reply@lala.com>',
      },
      template: {
        dir: join(__dirname, 'email/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    EmailModule,
    PropertiesModule,
    BookingsModule,
    FileModule,
    PublicModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
