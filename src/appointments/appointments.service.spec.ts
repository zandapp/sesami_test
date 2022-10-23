import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AppointmentsService } from './appointments.service';
import { Appointment, appointmentSchema } from './entities/appointment.entity';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  const start = new Date('2022-11-03T13:34:38.306Z');
  const end = new Date('2022-11-04T13:34:38.306Z');
  const _id = '6354e7a09fab41020fd5207f';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/sesami_test'),

        MongooseModule.forFeature([
          { name: Appointment.name, schema: appointmentSchema },
        ]),
      ],
      providers: [AppointmentsService],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('creates an appointment', async () => {
    const appointmentSpy = jest.spyOn(service, 'create');

    await service.create({
      start,
      end,
    });

    expect(appointmentSpy).toHaveBeenCalled();
    expect(appointmentSpy).toBeDefined();
  });
  it('updates an appointment', async () => {
    const appointmentSpy = jest.spyOn(service, 'update');

    const appointment = await service.create({
      _id: new Types.ObjectId(_id),
      start: new Date('2022-01-03T13:34:38.306Z'),
      end: new Date('2022-01-04T13:34:38.306Z'),
    });

    expect(appointmentSpy).toHaveBeenCalled();
    expect(appointmentSpy).toBeDefined();
  });
  it('throws exception on duplicate appointment ', async () => {
    const appointmentSpy = jest.spyOn(service, 'create');
    try {
      await service.create({
        start,
        end,
      });
    } catch (e) {
      expect(e).rejects;
    }
  });
});
