import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/domain/models/user.model';
import { IUserRepository } from 'src/domain/repositories/user-repository.interface';
import { User } from 'src/infrastructure/entities/user.entity';
import { UserMapper } from 'src/infrastructure/mappers/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userEntity: Model<User>,
    @Inject(UserMapper)
    private readonly mapper: UserMapper,
  ) {}

  async create(userModel: UserModel): Promise<UserModel> {
    const created = await this.userEntity.create(userModel);

    return this.mapper.fromEntityToModel(created);
  }

  async findAll(): Promise<UserModel[]> {
    const users = await this.userEntity.find();

    return users.map((item) => this.mapper.fromEntityToModel(item));
  }

  async findById(id: String): Promise<UserModel> {
    return;
  }
}
