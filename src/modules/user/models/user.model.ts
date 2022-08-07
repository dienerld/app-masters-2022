import {
  IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber,
  IsPostalCode, IsString, Min, MinLength,
} from 'class-validator';
import {
  Column, Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Donation } from '../../donation/models/donation.model';
import { UserDto } from '../dtos/user.dto';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @IsString({ message: 'name deve ser uma string' })
  @IsNotEmpty({ message: 'name é obrigatório' })
  @Column({ type: 'varchar', length: 50 })
    name: string;

  @IsOptional({ message: 'email é opcional' })
  @IsEmail({}, { message: 'Email inválido' })
  @Column({ type: 'varchar', length: 50, nullable: true })
    email?: string;

  @IsNotEmpty({ message: 'phone é obrigatório' })
  @Column({ type: 'varchar', length: 20 })
    phone: string;

  @IsPostalCode('BR', { message: 'CEP inválido' })
  @IsNotEmpty({ message: 'zip é obrigatório' })
  @Column({ type: 'varchar', length: 15 })
    zip: string;

  @IsNotEmpty({ message: 'city é obrigatório' })
  @IsString({ message: 'city deve ser uma string' })
  @Column({ type: 'varchar', length: 30 })
    city: string;

  @IsNotEmpty({ message: 'state é obrigatório' })
  @IsString({ message: 'state deve ser uma string' })
  @MinLength(2, { message: 'O estado deve ter no mínimo 2 caracteres' })
  @Column({ type: 'varchar', length: 30 })
    state: string;

  @IsNotEmpty({ message: 'streetAddress é obrigatório' })
  @IsString({ message: 'streetAddress deve ser uma string' })
  @MinLength(1, { message: 'Ao menos 1 carácter deve ser informado' })
  @Column({ type: 'varchar', length: 50 })
    streetAddress: string;

  @IsNumber({}, { message: 'deviceCount deve ser um número' })
  @Min(0, { message: 'O número deve ser maior ou igual a 0' })
  @Column()
    number: number;

  @IsOptional({ message: 'devices é opcional' })
  @IsNotEmpty({ message: 'complement inválido' })
  @IsString({ message: 'complement deve ser uma string' })
  @MinLength(2, { message: 'O complemento deve ter no mínimo 2 caracteres' })
  @Column({ type: 'varchar', length: 50, nullable: true })
    complement?: string;

  @IsNotEmpty({ message: 'neighborhood é obrigatório' })
  @IsString({ message: 'neighborhood deve ser uma string' })
  @MinLength(1, { message: 'O bairro deve ter no mínimo 1 caracteres' })
  @Column({ type: 'varchar', length: 50 })
    neighborhood: string;

  @IsNumber({}, { message: 'deviceCount deve ser um número' })
  @Min(0, { message: 'O número deve ser maior que 0' })
  @Column()
    deviceCount: number;

  @OneToMany(() => Donation, (donation) => donation.user)
    donations: Donation[];

  constructor(user: UserDto) {
    Object.assign(this, user);
  }
}
