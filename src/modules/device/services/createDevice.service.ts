import { Device } from '../models/device.model';
import { DeviceRepositoryInterface } from '../repositories/deviceRepository.interface';
import { DeviceRepository } from '../repositories/implementations/device.repository';

export class CreateDeviceService {
  private repository: DeviceRepositoryInterface;

  constructor() {
    this.repository = new DeviceRepository();
  }

  async execute(devices: Device[]): Promise<Device[]> {
    return this.repository.save(devices);
  }
}
