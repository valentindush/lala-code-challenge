import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';

@Injectable()
export class PropertiesService {
    constructor(private prisma: PrismaService) { }

    async create(createPropertyDto: CreatePropertyDto, hostId: string) {
        return this.prisma.property.create({
            data: {
                ...createPropertyDto,
                hostId: hostId,
            },
        });
    }

    async findAll(hostId: string) {
        return this.prisma.property.findMany({
            where: {
                hostId
            }
        });
    }

    async findOne(id: string) {
        const property = await this.prisma.property.findUnique({
            where: { id },
        });
        if (!property) throw new NotFoundException('Property not found');
        return property;
    }

    async update(id: string, updatePropertyDto: UpdatePropertyDto, hostId: string) {
        const property = await this.prisma.property.findUnique({ where: { id } });
        if (!property) throw new NotFoundException('Property not found');
        if (property.hostId !== hostId) throw new ForbiddenException('Access denied');

        return this.prisma.property.update({
            where: { id },
            data: updatePropertyDto,
        });
    }

    async remove(id: string, hostId: string) {
        const property = await this.prisma.property.findUnique({ where: { id } });
        if (!property) throw new NotFoundException('Property not found');
        if (property.hostId !== hostId) throw new ForbiddenException('Access denied');

        return this.prisma.property.delete({ where: { id } });
    }

    async getPublicProperties(){
        return this.prisma.property.findMany()
    }
}