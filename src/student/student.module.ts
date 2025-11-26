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

const repositories: Provider[] = [
  { provide: 'STUDENT_REPOSITORY', useClass: StudentRepository },
];

@Module({
  imports: [
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
  exports: [],
})
export class StudentModule {}
