import { Donation } from '../models/donation.model';
import { DonationRepositoryInterface } from '../repositories/donationRepository.interface';
import { DonationRepository } from '../repositories/implementations/donation.repository';

export class GetAllDonationsService {
  private repository: DonationRepositoryInterface;

  constructor() {
    this.repository = new DonationRepository();
  }

  async execute(): Promise<{total: number, donations:Donation[]}> {
    return this.repository.findAll();
  }
}
