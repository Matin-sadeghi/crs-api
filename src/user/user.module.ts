import { Module, Provider } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
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
  providers: [UserService, ...repositories],
  exports: [UserService, ...repositories],
})
export class UserModule {}
