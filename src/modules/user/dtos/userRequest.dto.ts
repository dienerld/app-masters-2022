import { DeviceDto } from '../../device/dtos/device.dto';

export interface UserRequestDto{
    name: string;
  phone: string;
  zip: string;
  city: string;
  streetAddress: string;
  state: string;
  number: string;
  neighborhood: string;
  deviceCount: number;
  devices: DeviceDto[];
  email?: string;
  complement?: string;
}
