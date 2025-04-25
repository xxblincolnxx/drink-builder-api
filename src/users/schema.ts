import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { menus } from '../menus/schema';
import { branches } from '../branches/schema';
import { inventory } from '../inventory/schema';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  refreshToken: text('refresh_token'),
  branchId: integer('branch_id').references(() => branches.id),
});

export const userRelations = relations(users, ({ many, one }) => ({
  menus: many(menus),
  branch: one(branches, {
    fields: [users.branchId],
    references: [branches.id],
  }),
  inventories: many(inventory),
}));
