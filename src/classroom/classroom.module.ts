import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultyModule } from 'src/faculty/faculty.module';
import { ClassroomController } from './controller/classroom.controller';
import { ClassroomRepository } from './database/repository/classroom.repository';
import {
  ClassroomDocument,
  ClassroomSchema,
} from './database/schema/classroom.schema';
import { ClassroomService } from './services/classroom.service';

const repositories: Provider[] = [
  { provide: 'CLASSROOM_REPOSITORY', useClass: ClassroomRepository },
];

@Module({
  imports: [
    FacultyModule,
    MongooseModule.forFeature([
      { name: ClassroomDocument.name, schema: ClassroomSchema },
    ]),
  ],
  controllers: [ClassroomController],
  providers: [...repositories, ClassroomService],
  exports: [...repositories, ClassroomService],
})
export class ClassroomModule {}
