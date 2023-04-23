import { DynamicModule, Module } from '@nestjs/common';
import { UsecaseProxy } from './usecase-proxy';
import { GetUsersUsecase } from 'src/usecases/user/get-users.usecase';
import { MongooseRepositoriesModule } from '../repositories/mongoose/mongoose-repositories.module';
import { UserRepository } from '../repositories/mongoose/user.repository';
import { CreateUsersUsecase } from 'src/usecases/user/create-user.usecase';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
@Module({
  imports: [MongooseRepositoriesModule, BcryptModule],
})
export class UserUsecasesProxyModule {
  static GET_USERS_USECASE_PROXY = 'GetUsersUsecaseProxy';
  static CREATE_USER_USECASE_PROXY = 'CreateUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UserUsecasesProxyModule,
      providers: [
        {
          inject: [UserRepository],
          provide: UserUsecasesProxyModule.GET_USERS_USECASE_PROXY,
          useFactory: (userRepository: UserRepository) =>
            new UsecaseProxy(new GetUsersUsecase(userRepository)),
        },
        {
          inject: [UserRepository, BcryptService],
          provide: UserUsecasesProxyModule.CREATE_USER_USECASE_PROXY,
          useFactory: (
            userRepository: UserRepository,
            bcryptService: BcryptService,
          ) =>
            new UsecaseProxy(
              new CreateUsersUsecase(userRepository, bcryptService),
            ),
        },
      ],
      exports: [
        UserUsecasesProxyModule.GET_USERS_USECASE_PROXY,
        UserUsecasesProxyModule.CREATE_USER_USECASE_PROXY,
      ],
    };
  }
}
