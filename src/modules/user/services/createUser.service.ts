import { validate } from 'class-validator';
import { RequestCustomError } from '../../../errors/requestError';
import { fixZip } from '../../../utils/fixZip';
import { removeSpaces } from '../../../utils/removeSpaces';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/implementations/user.repository';
import { UserRepositoryInterface } from '../repositories/userRepository.interface';

export class CreateUserService {
  private repository: UserRepositoryInterface;

  constructor() {
    this.repository = new UserRepository();
  }

  async execute(userDto : UserDto): Promise<User> {
    Object.keys(userDto).forEach((key:string) => {
      if (typeof userDto[key] === 'string') {
        userDto[key] = removeSpaces(userDto[key]);
      }
    });
    userDto.zip = fixZip(userDto.zip);

    const userRequest = new User(userDto);
    const errorsUser = await validate(userRequest);
    if (errorsUser.length > 0) {
      const constraints = errorsUser.map((error) => error.constraints);
      const constraintsKeys = Object.keys(constraints);
      const constraintsValues = constraintsKeys.map((key) => constraints[key]);
      const constraintsValuesKeys = Object.keys(constraintsValues);
      const constraintsValuesValues = constraintsValuesKeys.map((key) => constraintsValues[key]);
      const arrConst = constraintsValuesValues.map(
        (constraint) => Object.values(constraint)[0] as string,
      );
      throw new RequestCustomError({
        statusCode: 400,
        requiredFields: errorsUser.map((error) => error.property),
        errorMessage: arrConst,
      });
    }

    let user = await this.repository.findByPhone(userDto.phone)
    || await this.repository.findByEmail(userDto.email);

    if (user?.id) {
      const totalDevices = user.deviceCount + userDto.deviceCount;
      Object.assign(user, userDto);
      user.deviceCount = totalDevices;
      user = await this.repository.update(user.id, user);
    } else {
      user = new User(userDto);
    }

    try {
      const userSaved = await this.repository.save(user);
      return userSaved;
    } catch (err) {
      throw new RequestCustomError({
        statusCode: 400,
        errorMessage: ['Erro ao criar usuário e salvar os equipamentos'],
      });
    }
  }
}
