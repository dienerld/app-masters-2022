import { validate } from 'class-validator';
import { RequestCustomError } from '../../../errors/requestError';
import { removeSpaces } from '../../../utils/removeSpaces';
import { Donation } from '../../donation/models/donation.model';
import { DeviceDto } from '../dtos/device.dto';
import { Device } from '../models/device.model';
import { DeviceRepositoryInterface } from '../repositories/deviceRepository.interface';
import { DeviceRepository } from '../repositories/implementations/device.repository';

export class CreateDeviceService {
  private repository: DeviceRepositoryInterface;

  constructor() {
    this.repository = new DeviceRepository();
  }

  async execute(devicesDto: DeviceDto[], donation: Donation): Promise<Device[]> {
    const devices = devicesDto.map((device) => {
      device.condition = removeSpaces(device.condition) as DeviceDto['condition'];
      device.type = removeSpaces(device.type) as DeviceDto['type'];

      return new Device(device.type, device.condition, donation);
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

    const devicesSaved = await this.repository.save(devices);
    return devicesSaved;
  }
}
