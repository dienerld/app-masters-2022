import request from 'supertest';
import { app } from '../app';
import database from '../database';

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
    { type: 'Printer', condition: 'broken' },
  ],
});

describe('DonationController', () => {
  beforeAll(async () => {
    await database.create();
  });

  afterAll(async () => {
    await database.close();
  });

  beforeEach(async () => {
    await database.clear();
  });
  it('should return 200 OK', async () => {
    request(app).get('/donation').expect(200);
  });

  it('should saved', async () => {
    const user = makeUser();

    const response = await request(app).post('/donation').send(user);

    expect(response.statusCode).toBe(200);
  });

  it('should return 400 BAD REQUEST - Without Property Devices ', async () => {
    const user = makeUser();
    user.deviceCount = 0;
    user.devices = undefined;

    const response = await request(app).post('/donation').send(user);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', true);
    expect(response.body).toHaveProperty('errorMessage');
    expect(response.body).toHaveProperty('requiredFields', ['devices']);
  });

  it('should return 400 BAD REQUEST - Without Devices ', async () => {
    const user = makeUser();
    user.devices = [];

    const response = await request(app).post('/donation').send(user);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', true);
    expect(response.body).toHaveProperty('errorMessage');
  });

  it('should return 400 BAD REQUEST - Without State', async () => {
    const user = makeUser();

    const response = await request(app)
      .post('/donation')
      .send({ ...user, state: undefined });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', true);
    expect(response.body).toHaveProperty('errorMessage');
    expect(response.body).toHaveProperty('requiredFields', ['state']);
  });

  it('should return 400 BAD REQUEST - Without City and neighborhood', async () => {
    const user = makeUser();

    const response = await request(app)
      .post('/donation')
      .send({ ...user, city: undefined, neighborhood: undefined });

    expect(response.statusCode).toBe(400);

    expect(response.body).toHaveProperty('error', true);
    expect(response.body).toHaveProperty('requiredFields', ['city', 'neighborhood']);
    expect(response.body).toHaveProperty('errorMessage');
  });

  it('should return 400 BAD REQUEST - Invalid Type Device ', async () => {
    const user = makeUser();
    user.devices[0].type = 'Invalid Type';

    const response = await request(app).post('/donation').send(user);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', true);
    expect(response.body).toHaveProperty('errorMessage');
  });

  it('should return 400 BAD REQUEST - Invalid Condition Device ', async () => {
    const user = makeUser();
    user.devices[0].condition = 'Invalid Condition';

    console.log(user);
    const response = await request(app).post('/donation').send(user);
    console.log(response.body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', true);
    expect(response.body).toHaveProperty('errorMessage');
  });
});
