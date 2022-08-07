import { getRepository, Repository } from 'typeorm';
import { Donation } from '../../models/donation.model';
import { DonationRepositoryInterface } from '../donationRepository.interface';

export class DonationRepository implements DonationRepositoryInterface {
  private repository: Repository<Donation>;

  constructor() {
    this.repository = getRepository(Donation);
  }

  async findAll(): Promise<{ total: number; donations: Donation[]; }> {
    try {
      const [donations, total] = await this.repository.createQueryBuilder('donations')
        .innerJoin('donations.devices', 'devices')
        .addSelect('devices')
        .innerJoin('donations.user', 'user')
        .addSelect('user.id')
        .addSelect('user.name')
        .addSelect('user.phone')
        .orderBy('donations.createdAt', 'DESC')
        .getManyAndCount();
      return { total, donations };
    } catch (err) {
      throw new Error(err);
    }
  }

  findById(id: number): Promise<Donation> {
    return this.repository.findOneOrFail(id, { relations: ['user', 'devices'] });
  }

  async save(donation: Donation): Promise<Donation> {
    const newDonation = this.repository.create(donation);
    await this.repository.save(newDonation);

    return newDonation;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async update(id: number, donation: Donation): Promise<Donation> {
    await this.repository.update(id, donation);
    return this.repository.findOne(id);
  }
}
