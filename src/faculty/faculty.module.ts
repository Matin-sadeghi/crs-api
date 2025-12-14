import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FacultyController } from './controller/faculty.controller';
import { FacultyRepository } from './database/repository/faculty.repository';
import { FacultyService } from './services/faculty.service';

import {
  FacultyDocument,
  FacultySchema,
} from './database/schema/faculty.schema';

const repositories: Provider[] = [
  { provide: 'FACULTY_REPOSITORY', useClass: FacultyRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FacultyDocument.name,
        schema: FacultySchema,
      },
    ]),
  ],
  controllers: [FacultyController],
  providers: [FacultyService, ...repositories],
  exports: [FacultyService, ...repositories],
})
export class FacultyModule {}
