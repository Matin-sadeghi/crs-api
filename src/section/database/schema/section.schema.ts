import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { DayOfWeek } from 'src/utils/enum';

export const sectionOption: SchemaOptions = {
  versionKey: false,
  collection: 'section',
};

// Nested schema for schedule
@Schema({ _id: false })
export class Schedule {
  @Prop({ enum: DayOfWeek, required: true })
  day_of_week: DayOfWeek;

  @Prop({ type: String, required: true })
  start_time: string;

  @Prop({ type: String, required: true })
  endTime: string;
}

const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema(sectionOption)
export class SectionDocument {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ProfessorDocument', required: true })
  professor: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ClassroomDocument', required: true })
  classroom: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LessonDocument', required: true })
  lesson: Types.ObjectId;

  @Prop([
    {
      type: Types.ObjectId,
      ref: 'StudentDocument',
      required: false,
    },
  ])
  students: Types.ObjectId[];

  @Prop({ type: [ScheduleSchema], required: true })
  schedules: Schedule[];

  @Prop({ type: Number, required: true, min: 1 })
  capacity: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, nullable: true })
  updatedAt: Date;
}

export const SectionSchema = SchemaFactory.createForClass(SectionDocument);
