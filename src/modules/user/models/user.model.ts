import {
  IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber,
  IsPostalCode, IsString, Min, MinLength,
} from 'class-validator';
import {
  Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from '../../device/models/device.model';
import { UserDto } from '../dtos/user.dto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
    name: string;

  @IsOptional()
  @IsEmail({ message: 'Email inválido' })
  @Column({ type: 'varchar', length: 50, nullable: true })
    email?: string;

  @IsPhoneNumber('BR', { message: 'Telefone inválido' })
  @Column({ type: 'varchar', length: 20 })
    phone: string;

  @IsPostalCode('BR', { message: 'CEP inválido' })
  @Column({ type: 'varchar', length: 15 })
    zip: string;

  @IsString()
  @Column({ type: 'varchar', length: 30 })
    city: string;

  @IsString()
  @MinLength(2, { message: 'O estado deve ter no mínimo 2 caracteres' })
  @Column({ type: 'varchar', length: 30 })
    state: string;

  @IsString()
  @MinLength(1, { message: 'Ao menos 1 carácter deve ser informado' })
  @Column({ type: 'varchar', length: 50 })
    streetAddress: string;

  @IsNumber()
  @Min(0, { message: 'O número deve ser maior que 0' })
  @Column()
    number: number;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'O complemento deve ter no mínimo 2 caracteres' })
  @Column({ type: 'varchar', length: 50, nullable: true })
    complement?: string;

  @IsString()
  @MinLength(1, { message: 'O bairro deve ter no mínimo 1 caracteres' })
  @Column({ type: 'varchar', length: 50 })
    neighborhood: string;

  @IsNumber()
  @Min(0, { message: 'O número deve ser maior que 0' })
  @Column()
    deviceCount: number;

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
