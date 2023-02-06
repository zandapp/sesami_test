import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { runInThisContext } from 'vm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  findAll(start: Date, end: Date) {
    return this.appointmentModel.find({
      $and: [{ start: { $gte: start } }, { end: { $lte: end } }],
    });
  }
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}
  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    await this.validateAppointmentDate(
      new Date(createAppointmentDto.start),
      new Date(createAppointmentDto.end),
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
    await appointment.updateOne({
      start: updateAppointmentDto.start,
      end: updateAppointmentDto.end,
      history: [...appointment.history, appointment],
    });
    return this.appointmentModel.findOne({ _id });
  }
  private async validateAppointmentDate(start: Date, end: Date) {
    const appointments = await this.appointmentModel.find({
      $or: [
        {
          start: { $gte: start.getTime(), $lte: end.getTime() },
        },
        {
          end: { $gte: start.getTime(), $lte: end.getTime() },
        },
      ],
    });

    if (appointments.length > 0) {
      throw new HttpException('this date is reserved', HttpStatus.CONFLICT);
    }
  }
  async delete(_id: Types.ObjectId) {
    return this.appointmentModel.deleteOne({ _id });
  }
}
