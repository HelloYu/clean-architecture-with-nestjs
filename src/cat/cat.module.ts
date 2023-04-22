import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { MongoDBConfigModule } from 'src/infrastructure/config/mongodb/mongodb-config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './entities/cat.entity';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment-config.module';

@Module({
  imports: [
    MongoDBConfigModule,
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
