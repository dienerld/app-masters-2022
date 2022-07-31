import request from 'supertest';
import { app } from '../app';
import { User } from '../models/user.model';

const makeUser = () => ({
  name: 'Test User',
  email: 'test@test.com',
  city: 'Test City',
  state: 'Test State',
  neighborhood: 'Test Neighborhood',
  zip: '36301-154',
  streetAddress: 'Test Street Address',
  number: 123,
  phone: '+5511999999999',
  deviceCount: 2,
  devices: [
    { type: 'Desktop', condition: 'working' },
    { type: 'Impressora', condition: 'broken' },
  ],
});
describe('DonationController', () => {
  it('should return 200 OK', async () => {
    request(app).get('/donation').expect(200);
  });

  it('should saved', async () => {
    const user = makeUser();
    const response = await request(app).post('/donation').send(user);
    expect(response.statusCode).toBe(200);
  });

  it('should return 400 BAD REQUEST - Without Devices ', async () => {
    const user = makeUser();
    user.devices = [];
    const response = await request(app).post('/donation').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      error: true,
      errorMessage:
        'A quantidade de equipamentos (0) não está de acordo com as informações de equipamentos enviados (2)',
    });
  });

  it('should return 400 BAD REQUEST - Without State', async () => {
    const user = makeUser();
    const response = await request(app)
      .post('/donation')
      .send({ ...user, state: undefined });

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      error: true,
      requiredFields: ['state'],
      errorMessage: 'Todos os campos obrigatórios devem ser informados',
    });
  });

  it('should return 400 BAD REQUEST - Without City and neighborhood', async () => {
    const user = makeUser();
    const response = await request(app)
      .post('/donation')
      .send({ ...user, city: undefined, neighborhood: undefined });

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      error: true,
      requiredFields: ['city', 'neighborhood'],
      errorMessage: 'Todos os campos obrigatórios devem ser informados',
    });
  });

  it('should return 400 BAD REQUEST - Invalid Type Device ', async () => {
    const user = makeUser();
    user.devices[0].type = 'Invalid Type';
    const response = await request(app).post('/donation').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      error: true,
      errorMessage: 'O equipamento Invalid Type está com o status invalido',
    });
  });

  it('should return 400 BAD REQUEST - Invalid Condition Device ', async () => {
    const user = makeUser();
    user.devices[0].condition = 'Invalid Condition';
    const response = await request(app).post('/donation').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      error: true,
      errorMessage: 'O equipamento Desktop está com o status invalido',
    });
  });
});
