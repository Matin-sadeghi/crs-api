import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminController } from './controller/admin.controller';
import { AdminService } from './services/admin.service';
import { AdminRepository } from './database/repository/admin.repository';
import { AdminDocument, AdminSchema } from './database/schema/admin.schema';

import { UserModule } from 'src/user/user.module';  // <-- import UserModule here

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminDocument.name, schema: AdminSchema },
    ]),
    UserModule,  // <-- import UserModule here so AdminModule can access UserAdminService
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: 'ADMIN_REPOSITORY',
      useClass: AdminRepository,
    },
  ],
  exports: [AdminService],
})
export class AdminModule {}
