import { UserModel } from 'src/domain/models/user.model';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';

export class CreateUsersUsecase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(user: UserModel): Promise<UserModel> {
    const created = await this.repository.create(user);

    return created;
  }
}
