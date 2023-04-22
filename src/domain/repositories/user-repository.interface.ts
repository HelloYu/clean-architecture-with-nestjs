import { UserModel } from '../models/user.model';

export interface IUserRepository {
  create(userModel: UserModel): Promise<UserModel>;

  findAll(): Promise<UserModel[]>;

  findById(id: String): Promise<UserModel>;
}
