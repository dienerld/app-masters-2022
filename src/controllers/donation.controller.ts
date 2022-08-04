import { Router } from 'express';
import { UserRequestDto } from '../modules/user/dtos/userResquest.dto';
import { CreateUserService } from '../modules/user/services/createUser.service';

const routes = Router();
routes.get('/', async (req, res) => res.send('Hello World!'));

routes.post('/', async (req, res) => {
  const service = new CreateUserService();
  const requestBody: UserRequestDto = req.body;

  const response = await service.execute(requestBody);
  return res.status(201).json(response);
});

export { routes as donationController };
