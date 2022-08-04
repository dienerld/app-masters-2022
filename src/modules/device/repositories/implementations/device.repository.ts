import { getRepository, Repository } from 'typeorm';
import { Device } from '../../models/device.model';
import { DeviceRepositoryInterface } from '../deviceRepository.interface';

export class DeviceRepository implements DeviceRepositoryInterface {
  private repository: Repository<Device>;

  constructor() {
    this.repository = getRepository(Device);
  }

  findAll(): Promise<{ total: number; devices: Device[]; }> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<Device> {
    throw new Error('Method not implemented.');
  }

  findByType(type: string): Promise<Device> {
    throw new Error('Method not implemented.');
  }

  findByCondition(condition: string): Promise<Device> {
    throw new Error('Method not implemented.');
  }

  async save(devices: Device[]): Promise<Device[]> {
    const devicesCreated = devices.map((device) => this.repository.create(device));
    const devicesSaved = Promise.all(
      devicesCreated.map(async (device) => this.repository.save(device)),
    );

    return devicesSaved;
  }

  update(id: number, device: Device): Promise<Device> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
