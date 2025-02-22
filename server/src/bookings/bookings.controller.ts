import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './dto';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { GetUser } from 'src/auth/decorator/user.decorator';

@ApiTags('bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class BookingsController {
    constructor(private bookingsService: BookingsService) { }

    @Post()
    @Roles(UserRole.RENTER)
    @ApiOperation({ summary: 'Create booking (Renter only)' })
    create(@Body() dto: CreateBookingDto, @GetUser('id') userId: string) {
        return this.bookingsService.create(dto, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all bookings' })
    findAll(
        @GetUser('id') id: string, 
        @GetUser('role') role: UserRole, 
    ) {
        return this.bookingsService.findAll(id, role);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get booking by ID' })
    findOne(@Param('id') id: string) {
        return this.bookingsService.findOne(id);
    }

    @Put(':id')
    @Roles(UserRole.HOST)
    @ApiOperation({ summary: 'Update booking status (host only)' })
    update(
        @Param('id') id: string,
        @Body() dto: UpdateBookingDto,
        @GetUser('id') userId: string,
        @GetUser('role') userRole: UserRole,
    ) {
        return this.bookingsService.update(id, dto, userId, userRole);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Cancel booking' })
    remove(
        @Param('id') id: string,
        @GetUser('id') userId: string,
        @GetUser('role') userRole: UserRole,
    ) {
        return this.bookingsService.remove(id, userId, userRole);
    }
}