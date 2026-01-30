import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentController } from './controller/student.controller';
import { StudentRepository } from './database/repository/student.repository';
import { StudentService } from './services/student.service';
import { UserModule } from '../user/user.module';

import {
  StudentDocument,
  StudentSchema,
} from './database/schema/student.schema';
import { MajorModule } from 'src/major/major.module';
import { LessonModule } from 'src/lesson/lesson.module';

const repositories: Provider[] = [
  { provide: 'STUDENT_REPOSITORY', useClass: StudentRepository },
];

@Module({
  imports: [
    MajorModule,
    LessonModule,
    MongooseModule.forFeature([
      {
        name: StudentDocument.name,
        schema: StudentSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, ...repositories],
  exports: [StudentService],
})
export class StudentModule {}
