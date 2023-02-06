import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { start } from 'repl';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    createAppointmentDto: CreateAppointmentDto,
  ) {
    console.log(
      '%cappointments.controller.ts line:22 createAppointmentDto',
      'color: #007acc;',
      createAppointmentDto,
    );
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  findAll(@Query('start') start: Date, @Query('end') end: Date) {
    return this.appointmentsService.findAll(start, end);
  }
}
