import { Module, Provider } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserStudentService } from './services/user-student.service';
import { UserProfessorService } from './services/user-professor.service';
import { UserAdminService } from './services/user-admin.service';  // <-- import UserAdminService
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './database/schema/user.schema';
import { UserRepository } from './database/repository/user.repository';

const repositories: Provider[] = [
  { provide: 'USER_REPOSITORY', useClass: UserRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserStudentService,
    UserProfessorService,
    UserAdminService,          // <-- add here
    ...repositories,
  ],
  exports: [
    UserService,
    UserStudentService,
    UserProfessorService,
    UserAdminService,          // <-- export here
    ...repositories,
  ],
})
export class UserModule {}
