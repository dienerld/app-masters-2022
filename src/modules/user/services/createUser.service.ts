import { validate } from 'class-validator';
import { RequestCustomError } from '../../../errors/requestError';
import { Device } from '../../device/models/device.model';
import { UserRequestDto } from '../dtos/userResquest.dto';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/implementations/user.repository';
import { UserRepositoryInterface } from '../repositories/userRepository.interface';

function removeSpaces(str: string) {
  return str.replace(/\s{1,}/g, '');
}

export class CreateUserService {
  private repository: UserRepositoryInterface;

  constructor() {
    this.repository = new UserRepository();
  }

  async execute({ devices: devicesDto, ...userDto }: UserRequestDto): Promise<User> {
    const { email, phone } = userDto;
    const userAlreadyExists = await this.repository.findByPhone(phone)
    || await this.repository.findByEmail(email);

    if (userAlreadyExists) {
      throw new RequestCustomError({
        errorMessage: 'User already exists',
        statusCode: 400,
      });
    }

    if (devicesDto.length !== userDto.deviceCount) {
      throw new RequestCustomError({
        statusCode: 400,
        errorMessage: `A quantidade de equipamentos (${devicesDto.length}) não está de acordo com as informações de equipamentos enviados (${userDto.deviceCount})`,
      });
    }

    Object.keys(userDto).forEach((key:string) => {
      if (typeof userDto[key] === 'string') {
        userDto[key] = removeSpaces(userDto[key]);
      }
    });

    const devices = devicesDto.map(
      (device) => new Device(device.type, device.condition),
    );

    for await (const device of devices) {
      const errors = await validate(device);
      if (errors.length > 0) {
        throw new RequestCustomError({
          statusCode: 400,
          errorMessage: `O equipamento ${device.type} está com o status invalido`,
        });
      }
    }

    const newUser = new User(userDto);

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new RequestCustomError({
        statusCode: 400,
        requiredFields: errors.map((error) => error.property),
        errorMessage: 'Todos os campos obrigatórios devem ser informados',
      });
    }

    newUser.setDevices(devices);
    const userSaved = await this.repository.save(newUser);

    return userSaved;
  }
}
