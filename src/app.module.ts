import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';
import { SeedModule } from './seed/seed.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    LessonModule,
    SeedModule,
    StudentModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGO_URI_CONN'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
