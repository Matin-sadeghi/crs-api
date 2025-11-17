import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonAdminController } from './controller/lesson-admin.controller';
import { LessonRepository } from './database/repository/lesson.repository';
import { LessonDocument, LessonSchema } from './database/schema/lesson.schema';
import { LessonAdminService } from './services/lesson-admin.service';
const repositories: Provider[] = [
  { provide: 'LESSON_REPOSITORY', useClass: LessonRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonDocument.name, schema: LessonSchema },
    ]),
  ],
  controllers: [LessonAdminController],
  providers: [...repositories, LessonAdminService],
  exports: [],
})
export class LessonModule {}
