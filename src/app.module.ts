import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ClassroomModule } from './classroom/classroom.module';
import { FacultyModule } from './faculty/faculty.module';
import { LessonModule } from './lesson/lesson.module';
import { MajorModule } from './major/major.module';
import { ProfessorModule } from './professor/professor.module';
import { SeedModule } from './seed/seed.module';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    LessonModule,
    SeedModule,
    StudentModule,
    ProfessorModule,
    AdminModule,
    FacultyModule,
    MajorModule,
    ClassroomModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGO_URI_CONN'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
