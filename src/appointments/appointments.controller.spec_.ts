import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment, appointmentSchema } from './entities/appointment.entity';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('http://localhost:27017/sesami'),

        MongooseModule.forFeature([
          { name: Appointment.name, schema: appointmentSchema },
        ]),
      ],
      controllers: [AppointmentsController],
      providers: [AppointmentsService],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
