import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfessorController } from './controller/professor.controller';
import { ProfessorRepository } from './database/repository/professor.repository';
import { ProfessorService } from './services/professor.service';

import {
  ProfessorDocument,
  ProfessorSchema,
} from './database/schema/professor.schema';
import { UserModule } from 'src/user/user.module';

const repositories: Provider[] = [
  { provide: 'PROFESSOR_REPOSITORY', useClass: ProfessorRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProfessorDocument.name,
        schema: ProfessorSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService, ...repositories],
  exports: [],
})
export class ProfessorModule {}
