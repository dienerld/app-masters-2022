import {
  CreateDateColumn, Entity, ManyToOne,
  OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Device } from '../../device/models/device.model';
import { User } from '../../user/models/user.model';

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @CreateDateColumn()
    createdAt: Date;

  @OneToMany(() => Device, (device) => device.donation)
    devices: Device[];

  @ManyToOne(() => User, (user) => user.donations)
    user: User;

  constructor(user: User) {
    this.user = user;
  }
}
