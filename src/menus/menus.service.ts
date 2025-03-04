import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database-connection';
import * as schema from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class MenusService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getMenus() {
    return this.database.query.menus.findMany({
      with: {
        user: true,
      },
    });
  }

  async createMenu(menu: typeof schema.menus.$inferInsert) {
    await this.database.insert(schema.menus).values(menu);
  }
}
