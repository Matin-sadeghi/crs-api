import { Module } from '@nestjs/common';
import { SeedController } from './controller/seed.controller';
import { SeedService } from './services/seed.service';
import { UserModule } from 'src/user/user.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [UserModule, AdminModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
