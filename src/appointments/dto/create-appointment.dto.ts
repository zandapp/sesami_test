import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAppointmentDto {
  @IsOptional()
  _id?: Types.ObjectId;
  @IsNotEmpty()
  @IsDate()
  start: Date;
  @IsNotEmpty()
  @IsDateString()
  end: Date;
}
