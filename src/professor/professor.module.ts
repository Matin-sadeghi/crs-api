import { Module, Provider } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';

import { ProfessorController } from './controller/professor.controller';
import { ProfessorService } from './services/professor.service';
import { ProfessorRepository } from './database/repository/professor.repository';

import { UserDocument, UserSchema } from '../user/database/schema/user.schema';
import { ProfessorSchema } from './database/schema/professor.schema';

const repositories: Provider[] = [
  { provide: 'PROFESSOR_REPOSITORY', useClass: ProfessorRepository },
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
  controllers: [ProfessorController],
  providers: [
    ProfessorService,
    ...repositories,
    {
      provide: 'PROFESSOR_MODEL',
      useFactory: (connection) =>
        connection.model(UserDocument.name).discriminator('PROFESSOR', ProfessorSchema),
      inject: [getConnectionToken()],
    },
  ],
  exports: [ProfessorService, ...repositories],
})
export class ProfessorModule {}
