import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { User } from './dto/create-user.request';

interface GetUserArgs {
  email: string | null;
  id: string | null;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getUsers() {
    return this.database.query.users.findMany();
  }

  async getUser(args: GetUserArgs) {
    if (args.email === null && args.id === null) {
      throw new Error('Email or id must be provided');
    }

    const whereKey = args.email ? schema.users.email : schema.users.id;
    const whereValue = args.email ? args.email : args.id;

    const user = await this.database.query.users.findMany({
      where: eq(whereKey, whereValue!),
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

  async updateUserRefreshToken(user: User, token: string) {
    const hashedToken = await hash(token, 10);
    await this.database
      .update(schema.users)
      .set({ refreshToken: hashedToken })
      .where(eq(schema.users.email, user.email));
  }

  async getUserMenus(user: User) {
    return this.database.query.users.findFirst({
      where: eq(schema.users.email, user.email),
      with: {
        menus: true,
      },
    });
  }
}
