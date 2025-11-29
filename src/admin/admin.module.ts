import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminController } from './controller/admin.controller';
import { AdminService } from './services/admin.service';
import { AdminRepository } from './database/repository/admin.repository';
import { AdminDocument, AdminSchema } from './database/schema/admin.schema';

import { UserModule } from 'src/user/user.module'; // <-- import UserModule here

const repositories: Provider[] = [
  { provide: 'ADMIN_REPOSITORY', useClass: AdminRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminDocument.name, schema: AdminSchema },
    ]),
    UserModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, ...repositories],
  exports: [AdminService, ...repositories],
})
export class AdminModule {}
