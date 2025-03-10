import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return this.database.query.users.findMany();
  }

  async getUser(email: string) {
    const user = await this.database.query.users.findMany({
      where: eq(schema.users.email, email),
    });

    if (user.length < 1) {
      throw new NotFoundException('User not found');
    }
    return user[0];
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    const hashedPassword = await hash(user.password, 10);
    await this.database
      .insert(schema.users)
      .values({ ...user, password: hashedPassword });
  }
}
