import { UserModel } from 'src/domain/models/user.model';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';

export class GetUsersUsecase {
  constructor(private readonly repository: IUserRepository) {}

  async execute(): Promise<UserModel[]> {
    const users = await this.repository.findAll();

    return users;
  }
}
