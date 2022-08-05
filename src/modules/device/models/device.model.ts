import { IsString, Matches } from 'class-validator';
import {
  Column, CreateDateColumn, Entity, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/models/user.model';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @IsString()
  @Matches(/^(Notebook|Desktop|Netbook|Screen|Printer|Scanner)$/i)
  @Column({ type: 'varchar', length: 30 })
    type: string;

  @Column({ type: 'enum', enum: ['working', 'broken', 'notWorking'] })
  @Matches(/^(working|broken|notWorking)$/i)
    condition: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => User, (user) => user.devices, { })
    user: User;

  constructor(type: string, condition: string, user: User) {
    this.type = type;
    this.condition = condition;
    this.user = user;
  }
}
