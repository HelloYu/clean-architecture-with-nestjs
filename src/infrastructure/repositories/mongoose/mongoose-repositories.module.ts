import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBConfigModule } from 'src/infrastructure/config/mongodb/mongodb-config.module';
import { User, UserSchema } from 'src/infrastructure/entities/user.entity';
import { UserRepository } from './user.repository';
import { MappersModule } from 'src/infrastructure/mappers/mappers.module';

@Module({
  imports: [
    MongoDBConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MappersModule,
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class MongooseRepositoriesModule {}
