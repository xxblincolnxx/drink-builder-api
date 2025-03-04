import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from './database-connection';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import * as usersSchema from '../users/schema';
import * as menusSchema from '../menus/schema';

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
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
