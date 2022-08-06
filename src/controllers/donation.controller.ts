import { Router } from 'express';
import { CreateDonationService } from '../modules/donation/service/createDonation.service';
import { GetAllDonationsService } from '../modules/donation/service/getAllDonations.service';
import { UserRequestDto } from '../modules/user/dtos/userRequest.dto';

const routes = Router();
routes.get('/', async (req, res) => {
  const donationService = new GetAllDonationsService();
  const donations = await donationService.execute();

  return res.json({
    success: true,
    data: donations,
  });
});

routes.post('/', async (req, res) => {
  const donationService = new CreateDonationService();
  const requestBody: UserRequestDto = req.body;

  const { devices, donation } = await donationService.execute(requestBody);
  devices.forEach((device) => {
    device.donation = undefined;
  });

  return res.status(200).json({
    success: true,
    data: {
      ...donation,
      user: { ...donation.user, devices },
    },
  });
});

export { routes as donationController };
