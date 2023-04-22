import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/domain/models/user.model';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { User } from 'src/infrastructure/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userEntity: Model<User>,
  ) {}

  async insert(userModel: UserModel): Promise<UserModel> {
    const created = await this.userEntity.create(userModel);

    return userModel;
  }
  findAll(): Promise<UserModel[]> {
    return;
  }
  async findById(id: String): Promise<UserModel> {
    return;
  }
}
