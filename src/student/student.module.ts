import { Module, Provider } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';

import { StudentController } from './controller/student.controller';
import { StudentService } from './services/student.service';
import { StudentRepository } from './database/repository/student.repository';

import { UserDocument, UserSchema } from '../user/database/schema/user.schema';
import { StudentSchema } from './database/schema/student.schema';

const repositories: Provider[] = [
  { provide: 'STUDENT_REPOSITORY', useClass: StudentRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
        collection: 'user',
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [
    StudentService,
    ...repositories,
    {
      provide: 'STUDENT_MODEL',
      useFactory: (connection) =>
        connection.model(UserDocument.name).discriminator('STUDENT', StudentSchema),
      inject: [getConnectionToken()],  // <-- Fixed here
    },
  ],
  exports: [StudentService, ...repositories],
})
export class StudentModule {}
