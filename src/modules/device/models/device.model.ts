import { IsString, Matches } from 'class-validator';
import {
  Column, CreateDateColumn, Entity, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Donation } from '../../donation/models/donation.model';

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

  @ManyToOne(() => Donation, (donation) => donation.devices, { })
    donation: Donation;

  constructor(type: string, condition: string, donation: Donation) {
    this.type = type;
    this.condition = condition;
    this.donation = donation;
  }
}
