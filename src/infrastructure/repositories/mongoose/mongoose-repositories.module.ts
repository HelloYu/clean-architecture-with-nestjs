import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBConfigModule } from 'src/infrastructure/config/mongodb/mongodb-config.module';
import { User, UserSchema } from 'src/infrastructure/entities/user.entity';

@Module({
  imports: [
    MongoDBConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [],
  exports: [],
})
export class MongooseRepositoriesModule {}
