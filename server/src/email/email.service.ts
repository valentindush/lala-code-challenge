import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService
  ) { }

  private getBaseContext() {
    return {
      year: new Date().getFullYear(),
      logoUrl: 'https://lala.com/assets/logo.png',
      supportPhone: '+1-800-123-4567'
    };
  }

  async sendWelcomeEmail(user: { email: string; name: string }) {
    const currentYear = new Date().getFullYear();

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Lala Rentals - Find Your Perfect Stay',
      template: 'welcome', 
      context: {
        name: user.name,
        year: currentYear,
        exploreUrl: 'https://lala.com/explore',
        profileUrl: 'https://lala.com/profile',
        socialLinks: {
          twitter: 'https://twitter.com/lalarentals',
          facebook: 'https://facebook.com/lalarentals',
          instagram: 'https://instagram.com/lalarentals'
        },
        unsubscribeUrl: 'https://lala.com/email-preferences/unsubscribe',
        preferencesUrl: 'https://lala.com/email-preferences'
      }
    });
  }

  async sendHostBookingNotification(booking: {
    hostEmail: string;
    hostName: string;
    propertyName: string;
    bookingId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPayout: number;
    guestName: string;
    guestReviews?: string;
    reviewCount?: number;
    guestMessage?: string;
  }) {
    const context = {
      ...this.getBaseContext(),
      ...booking,
      approveUrl: `https://lala.com/host/bookings/${booking.bookingId}/approve`,
      rejectUrl: `https://lala.com/host/bookings/${booking.bookingId}/reject`,
      dashboardUrl: 'https://lala.com/host/dashboard'
    };
    
    await this.mailerService.sendMail({
      to: booking.hostEmail,
      subject: `New Booking Request: ${booking.propertyName}`,
      template: 'new-booking',
      context
    });
  }
  
  async sendBookingApprovalNotification(booking: {
    guestEmail: string;
    guestName: string;
    propertyName: string;
    propertyAddress: string;
    propertyImageUrl?: string;
    bookingId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalAmount: number;
    hostName?: string;
    hostMessage?: string;
  }) {
    const context = {
      ...this.getBaseContext(),
      ...booking,
      bookingDetailsUrl: `https://lala.com/trips/${booking.bookingId}`,
      tripsUrl: 'https://lala.com/trips',
      cancellationPolicyUrl: 'https://lala.com/policies/cancellation'
    };
    
    await this.mailerService.sendMail({
      to: booking.guestEmail,
      subject: 'Booking Confirmed! Your Reservation Details',
      template: 'approve',
      context
    });
  }
  
  async sendBookingRejectionNotification(booking: {
    guestEmail: string;
    guestName: string;
    propertyName: string;
    bookingId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    hostMessage?: string;
  }) {
 
    const context = {
      ...this.getBaseContext(),
      ...booking,
      searchUrl: `https://lala.com/search?checkin=${booking.checkIn}&checkout=${booking.checkOut}&guests=${booking.guests}`
    };
    
    await this.mailerService.sendMail({
      to: booking.guestEmail,
      subject: 'Update on Your Booking Request',
      template: 'reject',
      context
    });
  }

}