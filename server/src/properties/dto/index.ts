import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  guests: number;

  @ApiProperty()
  @IsString()
  imageUrl: string;
}

export class UpdatePropertyDto extends PartialType(CreatePropertyDto){}