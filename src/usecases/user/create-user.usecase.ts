import { UserModel } from 'src/domain/models/user.model';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { IBcryptService } from 'src/domain/services/bcrypt.interface';

export class CreateUsersUsecase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}

  async execute(user: UserModel): Promise<UserModel> {
    const found = await this.repository.findByUsername(user.username);

    user.password = await this.bcryptService.hash(user.password);
    const created = await this.repository.create(user);

    return created;
  }
}
