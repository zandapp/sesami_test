import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}
  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    console.log(
      '%cappointments.service.ts line:21 createAppointmentDto',
      'color: #007acc;',
      createAppointmentDto,
    );
    await this.validateAppointmentDate(
      createAppointmentDto.start,
      createAppointmentDto.end,
    );

    if (createAppointmentDto._id)
      return this.update(createAppointmentDto._id, createAppointmentDto);

    return new this.appointmentModel(createAppointmentDto).save();
  }

  async update(
    _id: Types.ObjectId,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const appointment = await this.appointmentModel.findOne({ _id });
    //add appointment to history
    return appointment.updateOne({
      start: updateAppointmentDto.start,
      end: updateAppointmentDto.end,
      history: [...appointment.history, appointment],
    });
    this.appointmentModel.updateOne({ _id }, { $set: updateAppointmentDto });
  }
  async findAll(start: Date, end: Date) {}
  private async validateAppointmentDate(start: Date, end: Date) {
    const appointments = await this.appointmentModel.find({
      $and: [{ start: { $gte: start } }, { end: { $lte: end } }],
    });
    if (appointments.length > 0) {
      throw new HttpException('date is reserved', HttpStatus.CONFLICT);
    }
  }
}
