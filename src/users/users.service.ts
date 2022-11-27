import { Injectable, HttpException } from '@nestjs/common';
import { USERS } from './users.mock';

@Injectable()
export class UsersService {
  users = USERS;

  getUsers(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  getUser(userId): Promise<any> {
    const id = Number(userId);
    return new Promise((resolve) => {
      const course = this.users.find((course) => course.id === id);
      if (!course) {
        throw new HttpException('Utilisateur inexistant', 404);
      }
      resolve(course);
    });
  }

  addUser(user): Promise<any> {
    return new Promise((resolve) => {
      user = { id: this.users.length + 1, ...user };
      this.users.push(user);
      resolve(this.users);
    });
  }
}
