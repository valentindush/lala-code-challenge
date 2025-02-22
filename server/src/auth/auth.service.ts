import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
        return this.jwtService.sign(payload);
    }

    async getUser(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } })
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user
    }
}
