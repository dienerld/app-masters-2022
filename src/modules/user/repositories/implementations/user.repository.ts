import { getRepository, Repository } from 'typeorm';
import { User } from '../../models/user.model';
import { UserRepositoryInterface } from '../userRepository.interface';

export class UserRepository implements UserRepositoryInterface {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findAll(): Promise<{total: number, users: User[]}> {
    try {
      const [users, total] = await this.repository.findAndCount();
      return { total, users };
    } catch (err) {
      throw new Error(err);
    }
  }

  async findById(id: number): Promise<User> {
    return this.repository.findOneOrFail(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async findByPhone(phone: string): Promise<User> {
    return this.repository.findOne({ where: { phone } });
  }

  async save(user: User): Promise<User> {
    const newUser = this.repository.create(user);
    await this.repository.save(newUser);

    return newUser;
  }

  async update(id: number, user: User): Promise<User> {
    await this.repository.update(id, user);
    return this.repository.findOneOrFail(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
