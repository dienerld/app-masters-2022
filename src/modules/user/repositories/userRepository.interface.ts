import { User } from '../models/user.model';

export interface UserRepositoryInterface {
  findAll(): Promise<{total: number, users: User[]}>;
  findById(id: number): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByPhone(phone: string): Promise<User>;
  save(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
