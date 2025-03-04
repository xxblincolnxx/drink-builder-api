import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from '../users/schema';
import { relations } from 'drizzle-orm';

export const menus = pgTable('menus', {
  id: serial('id').primaryKey(),
  title: varchar({ length: 256 }).notNull(),
  createdAt: timestamp().defaultNow(),
  userId: integer('user_id').references(() => users.id),
});

export const menuRelations = relations(menus, ({ one }) => ({
  user: one(users, {
    fields: [menus.userId],
    references: [users.id],
  }),
}));
