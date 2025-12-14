import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MajorController } from './controller/major.controller';
import { MajorRepository } from './database/repository/major.repository';
import { MajorDocument, MajorSchema } from './database/schema/major.schema';
import { MajorService } from './services/major.service';

const repositories: Provider[] = [
  { provide: 'MAJOR_REPOSITORY', useClass: MajorRepository },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MajorDocument.name, schema: MajorSchema },
    ]),
  ],
  controllers: [MajorController],
  providers: [...repositories, MajorService],
  exports: [...repositories, MajorService],
})
export class MajorModule {}
