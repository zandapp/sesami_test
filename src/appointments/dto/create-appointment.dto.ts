import { IsDate, IsDateString } from '@nestjs/class-validator';
import { Types } from 'mongoose';

export class CreateAppointmentDto {
  _id?: Types.ObjectId;
  @IsDate()
  start: Date;
  @IsDate()
  end: Date;
}
