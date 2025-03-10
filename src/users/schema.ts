import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { menus } from '../menus/schema';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  menus: many(menus),
}));
