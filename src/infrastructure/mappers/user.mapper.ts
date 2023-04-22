import { UserModel } from 'src/domain/models/user.model';
import { UserDocument } from '../entities/user.entity';
import { UserPresenter } from '../controllers/user/user.presenter';
import { Injectable } from '@nestjs/common';
import { UserRequestDto } from '../controllers/user/user-request.dto';

@Injectable()
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

  fromModelToPresenter(model: UserModel): UserPresenter {
    if (model) {
      const presenter: UserPresenter = new UserPresenter();
      presenter.id = model.id;
      presenter.email = model.email;
      presenter.username = model.username;
      return presenter;
    }
    return null;
  }

  fromDtoToModel(dto: UserRequestDto): UserModel {
    if (dto) {
      const model: UserModel = new UserModel();
      model.username = dto.username;
      model.password = dto.password;
      return model;
    }
    return null;
  }
}
