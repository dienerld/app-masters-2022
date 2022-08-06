import { Donation } from '../models/donation.model';

export interface DonationRepositoryInterface {
  findAll(): Promise<{total: number, donations: Donation[]}>;
  findById(id: number): Promise<Donation>;
  save(donation: Donation): Promise<Donation>;
  delete(id: number): Promise<void>;
}
