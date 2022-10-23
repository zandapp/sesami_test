import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, appointmentSchema } from './entities/appointment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: appointmentSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
