import { Controller, Inject, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserMapper } from 'src/infrastructure/mappers/user.mapper';
import { UsecaseProxy } from 'src/infrastructure/usecases-proxy/usecase-proxy';
import { UserUsecasesProxyModule } from 'src/infrastructure/usecases-proxy/user-usecases-proxy.module';
import { GetUsersUsecase } from 'src/usecases/user/get-users.usecase';
import { UserPresenter } from './user.presenter';
import { CreateUsersUsecase } from 'src/usecases/user/create-user.usecase';
import { UserRequestDto } from './user-request.dto';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecasesProxyModule.GET_USERS_USECASE_PROXY)
    private readonly getUsersUsecaseProxy: UsecaseProxy<GetUsersUsecase>,
    @Inject(UserUsecasesProxyModule.CREATE_USER_USECASE_PROXY)
    private readonly createUserUsecaseProxy: UsecaseProxy<CreateUsersUsecase>,
    @Inject(UserMapper)
    private readonly mapper: UserMapper,
    @Inject(LoggerService)
    private readonly logger: LoggerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() userRequestDto: UserRequestDto): Promise<UserPresenter> {
    const user = this.mapper.fromDtoToModel(userRequestDto);

    const created = await this.createUserUsecaseProxy
      .getInstance()
      .execute(user);

    return this.mapper.fromModelToPresenter(created);
  }

  @Get()
  async getUsers(): Promise<UserPresenter[]> {
    const users = await this.getUsersUsecaseProxy.getInstance().execute();

    this.logger.log('User Controller', 'get users');

    return users.map((item) => this.mapper.fromModelToPresenter(item));
  }
}
