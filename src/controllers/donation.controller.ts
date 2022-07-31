import { validate } from 'class-validator';
import { Router } from 'express';
import { Device } from '../models/device.model';
import { TUser, User } from '../models/user.model';

const routes = Router();
routes.get('/', async (req, res) => res.send('Hello World!'));

routes.post('/', async (req, res) => {
  const body: TUser = req.body;

  const user = new User(body);
  const devices: Device[] = body.devices.map(
    ({ condition, type }) => new Device(type, condition)
  );

  if (devices.length !== body.deviceCount) {
    return res.status(400).json({
      error: true,
      errorMessage: `A quantidade de equipamentos (${devices.length}) não está de acordo com as informações de equipamentos enviados (${body.deviceCount})`,
    });
  }

  try {
    for await (let device of devices) {
      const errors = await validate(device);
      if (errors.length > 0) {
        throw new Error(
          `O equipamento ${device.getType()} está com o status invalido`
        );
      }
    }
    user.setDevices(devices);
  } catch (e: any) {
    return res.status(400).json({
      error: true,
      errorMessage: e.message,
    });
  }

  validate(user).then((errors) => {
    if (errors.length > 0) {
      return res.status(400).json({
        error: true,
        requiredFields: errors.map((error) => error.property),
        errorMessage: 'Todos os campos obrigatórios devem ser informados',
      });
    }
    return res.json({ success: true });
  });
});

export { routes as donationController };
