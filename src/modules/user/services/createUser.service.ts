import { validate } from 'class-validator';
import { RequestCustomError } from '../../../errors/requestError';
import { Device } from '../../device/models/device.model';
import { CreateDeviceService } from '../../device/services/createDevice.service';
import { UserRequestDto } from '../dtos/userRequest.dto';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/implementations/user.repository';
import { UserRepositoryInterface } from '../repositories/userRepository.interface';

function removeSpaces(str: string) {
  return str.replace(/\s{1,}/g, '');
}

export class CreateUserService {
  private repository: UserRepositoryInterface;

  private deviceService: CreateDeviceService;

  constructor() {
    this.repository = new UserRepository();
    this.deviceService = new CreateDeviceService();
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

    const newUser = new User(userDto);
    const errorsUser = await validate(newUser);
    if (errorsUser.length > 0) {
      throw new RequestCustomError({
        statusCode: 400,
        requiredFields: errorsUser.map((error) => error.property),
        errorMessage: 'Todos os campos obrigatórios devem ser informados',
      });
    }
    const userSaved = await this.repository.save(newUser);

    const devices = devicesDto.map(
      (device) => new Device(device.type, device.condition, userSaved),
    );

    for await (const device of devices) {
      const errorsDevice = await validate(device);
      if (errorsDevice.length > 0) {
        throw new RequestCustomError({
          statusCode: 400,
          errorMessage: `O equipamento ${device.type} está com o status invalido`,
        });
      }
    }

    try {
      const devicesSaved = await this.deviceService.execute(devices);
      userSaved.setDevices(devicesSaved);
      return userSaved;
    } catch (err) {
      await this.repository.delete(userSaved.id);
      throw new RequestCustomError({
        statusCode: 400,
        errorMessage: 'Erro ao criar usuário e salvar os equipamentos',
      });
    }
  }
}
