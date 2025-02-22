import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateBookingDto {
    @ApiProperty({ type: Date })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    checkIn: Date;

    @ApiProperty({ type: Date })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    checkOut: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    propertyId: string;
}

export class UpdateBookingDto {
    @ApiProperty({ enum: BookingStatus, required: false })
    @IsEnum(BookingStatus)
    status?: BookingStatus;
}