import { Module } from "@nestjs/common";
import { BookingsService } from "src/bookings/bookings.service";
import { PropertiesService } from "src/properties/properties.service";
import { PublicController } from "./public.controller";

@Module({
    providers: [BookingsService, PropertiesService],
    controllers: [PublicController]
})
export class PublicModule {

}