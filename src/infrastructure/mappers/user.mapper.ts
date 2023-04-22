import { UserModel } from 'src/domain/models/user.model';
import { UserDocument } from '../entities/user.entity';

export class UserMapper {
  fromEntityToModel(entity: UserDocument): UserModel {
    if (entity) {
      const user: UserModel = new UserModel();
      user.id = entity.id;
      user.email = entity.email;
      user.password = entity.password;
      return user;
    }
    return null;
  }
}
