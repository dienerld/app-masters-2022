import { Router } from 'express';
import { UserRequestDto } from '../modules/user/dtos/userRequest.dto';
import { CreateUserService } from '../modules/user/services/createUser.service';

const routes = Router();
routes.get('/', async (req, res) => res.send('Hello World!'));

routes.post('/', async (req, res) => {
  const service = new CreateUserService();
  const requestBody: UserRequestDto = req.body;

  const response = await service.execute(requestBody);
  const cleanResponse = {
    ...response,
    devices: response.devices.map(({ user, ...device }) => device),
  };
  return res.status(200).json({
    success: true,
    data: cleanResponse,
  });
});

export { routes as donationController };
