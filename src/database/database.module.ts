import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from './database-connection';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import * as usersSchema from '../users/schema';
import * as menusSchema from '../menus/schema';
import * as branchesSchema from '../branches/schema';
import * as organizationsSchema from '../organizations/schema';
import * as drinksSchema from '../drinks/schema';
import * as inventorySchema from '../inventory/schema';
import * as vendorsSchema from '../vendors/schema';
import * as mixersSchema from '../mixers/schema';
import * as categoriesSchema from '../categories/schema';
import * as spiritsSchema from '../spirits/schema';
import * as drinksToMenusSchema from '../utilities/other_schemas/drinks_to_menus';
import * as drinksToInventorySchema from '../utilities/other_schemas/drinks_to_inventory';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow<string>('DATABASE_URL'),
        });
        return drizzle(pool, {
          schema: {
            ...usersSchema,
            ...menusSchema,
            ...branchesSchema,
            ...organizationsSchema,
            ...drinksSchema,
            ...inventorySchema,
            ...vendorsSchema,
            ...mixersSchema,
            ...categoriesSchema,
            ...spiritsSchema,
            ...drinksToMenusSchema,
            ...drinksToInventorySchema,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
