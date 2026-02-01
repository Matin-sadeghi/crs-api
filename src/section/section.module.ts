import { forwardRef, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { LessonModule } from 'src/lesson/lesson.module';
import { ProfessorModule } from 'src/professor/professor.module';
import { StudentModule } from 'src/student/student.module';
import { SectionController } from './controller/section.controller';
import { SectionRepository } from './database/repository/section.repository';
import {
  SectionDocument,
  SectionSchema,
} from './database/schema/section.schema';
import { SectionService } from './services/section.service';

const repositories: Provider[] = [
  { provide: 'SECTION_REPOSITORY', useClass: SectionRepository },
];

@Module({
  imports: [
    ProfessorModule,
    ClassroomModule,
    forwardRef(() => LessonModule),
    StudentModule,
    MongooseModule.forFeature([
      { name: SectionDocument.name, schema: SectionSchema },
    ]),
  ],
  controllers: [SectionController],
  providers: [...repositories, SectionService],
  exports: [...repositories, SectionService],
})
export class SectionModule {}
