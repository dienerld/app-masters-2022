import { validate } from 'class-validator';
import { RequestCustomError } from '../../../errors/requestError';
import { fixZip } from '../../../utils/fixZip';
import { removeSpaces } from '../../../utils/removeSpaces';
import { DeviceDto } from '../../device/dtos/device.dto';
import { Device } from '../../device/models/device.model';
import { CreateDeviceService } from '../../device/services/createDevice.service';
import { UserRequestDto } from '../dtos/userRequest.dto';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/implementations/user.repository';
import { UserRepositoryInterface } from '../repositories/userRepository.interface';

export class CreateUserService {
  private repository: UserRepositoryInterface;

  private deviceService: CreateDeviceService;

  constructor() {
    this.repository = new UserRepository();
    this.deviceService = new CreateDeviceService();
  }

  async execute({ devices: devicesDto, ...userDto }: UserRequestDto): Promise<User> {
    if (!devicesDto) {
      throw new RequestCustomError({
        errorMessage: ['Devices é obrigatório'],
        statusCode: 400,
        requiredFields: ['devices'],
      });
    }
    if (devicesDto?.length !== userDto.deviceCount) {
      throw new RequestCustomError({
        statusCode: 400,
        errorMessage: [`A quantidade de equipamentos (${devicesDto?.length}) não está de acordo com as informações de equipamentos enviados (${userDto.deviceCount})`],
      });
    }

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
      Object.assign(user, userDto);
      user = await this.repository.update(user.id, user);
    } else {
      user = new User(userDto);
    }

    const userSaved = await this.repository.save(user);
    const devices = devicesDto.map((device) => {
      device.condition = removeSpaces(device.condition) as DeviceDto['condition'];
      device.type = removeSpaces(device.type) as DeviceDto['type'];

      return new Device(device.type, device.condition, userSaved);
    });

    for await (const device of devices) {
      const errorsDevice = await validate(device);
      if (errorsDevice.length > 0) {
        throw new RequestCustomError({
          statusCode: 400,
          errorMessage: [`O equipamento ${device.type} está com o status invalido`],
        });
      }
    }

    try {
      const devicesSaved = await this.deviceService.execute(devices);
      userSaved.setDevices(devicesSaved);
      return userSaved;
    } catch (err) {
      throw new RequestCustomError({
        statusCode: 400,
        errorMessage: ['Erro ao criar usuário e salvar os equipamentos'],
      });
    }
  }
}
