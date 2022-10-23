import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop()
  start: Date;
  @Prop()
  end: Date;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop({ type: Object, default: [] })
  history: Object[];
}
export const appointmentSchema = SchemaFactory.createForClass(Appointment);
