import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsPostalCode,
  IsString,
  MinLength,
} from 'class-validator';
import { Device, TDevice } from './device.model';

export type TUser = {
  name: string;
  phone: string;
  zip: string;
  city: string;
  streetAddress: string;
  state: string;
  number: string;
  neighborhood: string;
  deviceCount: number;
  devices: TDevice[];
  email?: string;
  complement?: string;
};

export class User {
  @IsString()
  private name!: string;

  @IsOptional()
  @IsEmail()
  private email?: string;

  @IsPhoneNumber('BR')
  private phone!: string;

  @IsPostalCode('BR')
  private zip!: string;

  @IsString()
  private city!: string;

  @IsString({ always: true })
  @MinLength(2)
  private state!: string;

  @IsString()
  @MinLength(2)
  private streetAddress!: string;

  @IsNumber()
  private number!: number;

  @IsOptional()
  @IsString()
  private complement?: string;

  @IsString()
  private neighborhood!: string;

  @IsNumber()
  private deviceCount: number;

  @IsOptional()
  @IsPositive()
  private devices: Device[];

  constructor(user: TUser) {
    Object.assign(this, user);
    this.devices = [];
    this.deviceCount ??= 0;
  }

  public setDevices(devices: Device[]): void {
    this.devices = devices;
    this.deviceCount = devices.length;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string | undefined {
    return this.email;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getZip(): string {
    return this.zip;
  }

  public getCity(): string {
    return this.city;
  }

  public getState(): string {
    return this.state;
  }

  public getStreetAddress(): string {
    return this.streetAddress;
  }

  public getNumber(): number {
    return this.number;
  }

  public getComplement(): string | undefined {
    return this.complement;
  }

  public getNeighborhood(): string {
    return this.neighborhood;
  }

  public getDeviceCount(): number {
    return this.deviceCount;
  }

  public getDevices(): Device[] {
    return this.devices;
  }
}
