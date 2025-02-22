import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus, UserRole } from '@prisma/client';
import { CreateBookingDto, UpdateBookingDto } from 'src/bookings/dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class BookingsService {
    constructor(
        private prisma: PrismaService,
        private emailService: EmailService
    ) { }

    async create(createBookingDto: CreateBookingDto, renterId: string) {
        const { propertyId, checkIn, checkOut } = createBookingDto;

        const overlapping = await this.prisma.booking.findMany({
            where: {
                propertyId,
                status: { not: BookingStatus.CANCELLED },
                OR: [
                    { checkIn: { lt: checkOut }, checkOut: { gt: checkIn } },
                ],
            },
        });

        if (overlapping.length > 0) {
            throw new ConflictException('Property already booked for these dates');
        }

        const booking = await this.prisma.booking.create({
            data: {
                checkIn,
                checkOut,
                renterId,
                propertyId,
                status: BookingStatus.PENDING,
            },
            include: {
                renter: true,
                property: {
                    include: {
                        host: true
                    }
                }
            }
        });

        await this.emailService.sendHostBookingNotification({
            bookingId: booking.id,
            checkIn: booking.checkIn.toLocaleDateString(),
            checkOut: booking.checkOut.toLocaleDateString(),
            guestName: booking.renter.name,
            guests: booking.property.guests,
            hostEmail: booking.property.host.email,
            hostName: booking.property.host.name,
            propertyName: booking.property.title,
            totalPayout: booking.property.price,
        })

        return booking
    }

    async findAll(userId: string, role: UserRole) {
        if (role === UserRole.HOST) {
            return this.prisma.booking.findMany({
                where: {
                    property: {
                        hostId: userId
                    }
                },
                include: {
                    property: true,
                    renter: true,
                }
            });
        } else if (role == UserRole.ADMIN) {
            return this.prisma.booking.findMany({
                include: {
                    property: true,
                    renter: true,
                }
            });
        }

        return this.prisma.booking.findMany({
            where: {
                renterId: userId
            },
            include: {
                property: true
            }
        })
           
    }

    async findOne(id: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { property: true, renter: true },
        });
        if (!booking) throw new NotFoundException('Booking not found');
        return booking;
    }

    async update(id: string, updateBookingDto: UpdateBookingDto, userId: string, userRole: UserRole) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { property: true },
        });
        if (!booking) throw new NotFoundException('Booking not found');

        // Authorization checks
        if (userRole === UserRole.HOST && booking.property.hostId !== userId) {
            throw new ForbiddenException('Not the property host');
        }
        if (userRole === UserRole.RENTER && booking.renterId !== userId) {
            throw new ForbiddenException('Not the booking renter');
        }

        const updated = await this.prisma.booking.update({
            where: { id },
            data: updateBookingDto,
            include: {
                property: {
                    include: {
                        host: true
                    }
                },
                renter: true
            }
        });


        //send notification emails
        if (userRole == UserRole.HOST) {

            if (updateBookingDto.status === BookingStatus.CONFIRMED) {
                await this.emailService.sendBookingApprovalNotification({
                    guestEmail: updated.renter.email,
                    guestName: updated.renter.name,
                    propertyName: updated.property.title,
                    propertyAddress: updated.property.location,
                    propertyImageUrl: updated.property.imageUrl,
                    bookingId: updated.id,
                    checkIn: updated.checkIn.toLocaleDateString(),
                    checkOut: updated.checkOut.toLocaleDateString(),
                    guests: updated.property.guests,
                    totalAmount: updated.property.price,
                    hostName: updated.property.host.name,
                })
            }

            if (updateBookingDto.status === BookingStatus.CANCELLED) {
                await this.emailService.sendBookingRejectionNotification({
                    guestEmail: updated.renter.email,
                    guestName: updated.renter.name,
                    propertyName: updated.property.title,
                    bookingId: updated.id,
                    checkIn: updated.checkIn.toLocaleDateString(),
                    checkOut: updated.checkOut.toLocaleDateString(),
                    guests: updated.property.guests,
                })
            }
        }

        return updated
    }

    async remove(id: string, userId: string, userRole: UserRole) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: { property: true },
        });
        if (!booking) throw new NotFoundException('Booking not found');

        if (
            (userRole === UserRole.HOST && booking.property.hostId !== userId) ||
            (userRole === UserRole.RENTER && booking.renterId !== userId)
        ) {
            throw new ForbiddenException('Access denied');
        }

        return this.prisma.booking.delete({ where: { id } });
    }
}