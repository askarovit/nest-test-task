import { IsDateString, IsNumber, IsString, IsOptional } from 'class-validator';

export class CarDto {
  @IsNumber()
  price: number;

  @IsDateString()
  firstRegistrationDate: Date;

  @IsString()
  manufacturer: string;
}