import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { GetUser } from 'src/auth/decorator/user.decorator';

@ApiTags('properties')
@Controller('properties')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PropertiesController {
    constructor(private propertiesService: PropertiesService) { }

    @Post()
    @Roles(UserRole.HOST)
    @ApiOperation({ summary: 'Create property (Host only)' })
    create(@Body() dto: CreatePropertyDto, @GetUser('id') userId: string) {
        return this.propertiesService.create(dto, userId);
    }

    @Roles(UserRole.HOST)
    @Get()
    @ApiOperation({ summary: 'Get all properties' })
    findAll(@GetUser('id') id: string) {
        return this.propertiesService.findAll(id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get property by ID' })
    findOne(@Param('id') id: string) {
        return this.propertiesService.findOne(id);
    }

    @Put(':id')
    @Roles(UserRole.HOST)
    @ApiOperation({ summary: 'Update property (Host only)' })
    update(
        @Param('id') id: string,
        @Body() dto: UpdatePropertyDto,
        @GetUser('id') userId: string,
    ) {
        return this.propertiesService.update(id, dto, userId);
    }

    @Delete(':id')
    @Roles(UserRole.HOST)
    @ApiOperation({ summary: 'Delete property (Host only)' })
    remove(@Param('id') id: string, @GetUser('id') userId: string) {
        return this.propertiesService.remove(id, userId);
    }
}