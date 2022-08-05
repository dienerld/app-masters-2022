import request from 'supertest';
import { app } from './app';

describe('Test Root Server', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should alive true', async () => {
    const response = await request(app).get('/');
    expect(response.body).toMatchObject({ alive: true });
  });
});
