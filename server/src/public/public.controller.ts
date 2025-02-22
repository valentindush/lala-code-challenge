import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/auth/decorator/public.decorator";
import { BookingsService } from "src/bookings/bookings.service";
import { PropertiesService } from "src/properties/properties.service";

@ApiTags('public')
@Public()
@Controller('public')
export class PublicController {

    constructor(
        private propertiesService: PropertiesService,
        private bookingsService: BookingsService
    ) { }

    @Get('properties')
    getProperties(){
        return this.propertiesService.getPublicProperties()
    }
}