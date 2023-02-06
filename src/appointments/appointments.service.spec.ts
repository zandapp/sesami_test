import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AppointmentsService } from './appointments.service';
import { Appointment, appointmentSchema } from './entities/appointment.entity';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  const start = new Date('2022-05-03T13:30:00');
  const end = new Date('2022-05-03T14:30:00');
  let _id;
  let secondAppointment;
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

  it('creates an appointment', async () => {
    const appointmentSpy = jest.spyOn(service, 'create');

    const appointment = await service.create({
      start,
      end,
    });
    _id = appointment._id;

    expect(appointmentSpy).toHaveBeenCalled();
    expect(appointmentSpy).toBeDefined();
    expect(appointment.start).toEqual(start);
  });

  it('throws exception on duplicate appointment ', async () => {
    const appointmentSpy = jest.spyOn(service, 'create');
    try {
      const appointment = await service.create({
        start: new Date('2022-05-03T13:35:38'),
        end,
      });
    } catch (e) {
      expect(e).rejects;
    }
  });
  it('updates an appointment', async () => {
    const appointmentSpy = jest.spyOn(service, 'update');

    const appointment = await service.create({
      _id: new Types.ObjectId(_id),
      start: new Date('2022-05-03T13:35:38'),
      end: new Date('2022-05-03T13:36:38'),
    });

    expect(appointmentSpy).toHaveBeenCalled();
    expect(appointmentSpy).toBeDefined();
    expect(appointment.history.length).toBeGreaterThan(0);
  });
  it('not throws exception on another appointment ', async () => {
    const appointmentSpy = jest.spyOn(service, 'create');
    const appointment = await service.create({
      start: new Date('2022-05-03T17:30:00'),
      end: new Date('2022-05-03T18:30:00'),
    });
    secondAppointment = appointment._id;

    expect(appointment._id).toBeDefined();
  });
  it('retrives appointments between given dates', async () => {
    const appointments = await service.findAll(
      new Date('2022-05-03T17:00:00'),
      new Date('2022-05-03T18:30:00'),
    );
    expect(appointments.length).toBe(1);
  });
  it('deletes appointment', async () => {
    const appointmentSpy = jest.spyOn(service, 'delete');

    const a = await service.delete(_id);
    const b = await service.delete(secondAppointment);
    expect(a.deletedCount).toBe(1);
    expect(b.deletedCount).toBe(1);
  });
});
