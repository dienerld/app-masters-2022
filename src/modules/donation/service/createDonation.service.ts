import { RequestCustomError } from '../../../errors/requestError';
import { removeSpaces } from '../../../utils/removeSpaces';
import { Device } from '../../device/models/device.model';
import { CreateDeviceService } from '../../device/services/createDevice.service';
import { UserRequestDto } from '../../user/dtos/userRequest.dto';
import { CreateUserService } from '../../user/services/createUser.service';
import { Donation } from '../models/donation.model';
import { DonationRepositoryInterface } from '../repositories/donationRepository.interface';
import { DonationRepository } from '../repositories/implementations/donation.repository';

export class CreateDonationService {
  private repository: DonationRepositoryInterface;

  private deviceService: CreateDeviceService;

  private userService: CreateUserService;

  constructor() {
    this.repository = new DonationRepository();
    this.deviceService = new CreateDeviceService();
    this.userService = new CreateUserService();
  }

  async execute(
    { devices: devicesDto, ...userDto }: UserRequestDto,
  ): Promise<{donation: Donation, devices: Device[]}> {
    if (devicesDto?.length === 0) {
      throw new RequestCustomError({
        errorMessage: ['devices é obrigatório'],
        statusCode: 400,
        requiredFields: ['devices'],
      });
    }
    if (devicesDto?.length !== userDto.deviceCount) {
      throw new RequestCustomError({
        statusCode: 400,
        errorMessage: [`A quantidade de equipamentos (${devicesDto?.length}) não está de acordo com as informações de equipamentos enviados (${userDto.deviceCount})`],
      });
    }

    Object.keys(userDto).forEach((key:string) => {
      if (typeof userDto[key] === 'string') {
        userDto[key] = removeSpaces(userDto[key]);
      }
    });

    try {
      const userSaved = await this.userService.execute(userDto);

      const donation = new Donation(userSaved);
      const donationSaved = await this.repository.save(donation);

      const devicesSaved = await this.deviceService.execute(devicesDto, donationSaved);
      return {
        donation: donationSaved,
        devices: devicesSaved,
      };
    } catch (err) {
      console.log(err);

      if (err instanceof RequestCustomError) {
        throw err;
      }
      throw new RequestCustomError({
        statusCode: 400,
        errorMessage: ['Erro ao criar usuário e salvar os equipamentos'],
      });
    }
  }
}
