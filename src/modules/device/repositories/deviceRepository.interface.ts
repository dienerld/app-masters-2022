import { Device } from '../models/device.model';

export interface DeviceRepositoryInterface {
  findAll(): Promise<{ total: number; devices: Device[] }>;
  findById(id: number): Promise<Device>;
  findByType(type: string): Promise<Device>;
  findByCondition(condition: string): Promise<Device>;
  save(device: Device[]): Promise<Device[]>;
  update(id: number, device: Device): Promise<Device>;
  delete(id: number): Promise<void>;
}
