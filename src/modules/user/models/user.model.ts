import {
  IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber,
  IsPositive, IsPostalCode, IsString, MinLength,
} from 'class-validator';
import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from '../../device/models/device.model';
import { UserDto } from '../dtos/user.dto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
    name!: string;

  @IsOptional()
  @IsEmail()
  @Column({ type: 'varchar', length: 50, nullable: true })
    email?: string;

  @IsPhoneNumber('BR')
  @Column({ type: 'varchar', length: 20 })
    phone!: string;

  @IsPostalCode('BR')
  @Column({ type: 'varchar', length: 15 })
    zip!: string;

  @IsString()
  @Column({ type: 'varchar', length: 30 })
    city!: string;

  @IsString()
  @MinLength(2)
  @Column({ type: 'varchar', length: 30 })
    state!: string;

  @IsString()
  @MinLength(2)
  @Column({ type: 'varchar', length: 50 })
    streetAddress!: string;

  @IsNumber()
  @Column()
    number!: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @Column({ type: 'varchar', length: 50, nullable: true })
    complement?: string;

  @IsString()
  @Column({ type: 'varchar', length: 50 })
    neighborhood!: string;

  @IsNumber()
  @Column()
    deviceCount: number;

  @IsOptional()
  @IsPositive()
  @OneToMany(() => Device, (device) => device.user)
    devices: Device[];

  constructor(user: UserDto) {
    Object.assign(this, user);
  }

  public setDevices(devices: Device[]): void {
    this.devices = devices;
    this.deviceCount = devices.length;
  }
}
