import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from '../users/schema';
import { relations } from 'drizzle-orm';
import { branches } from '../branches/schema';
import { drinksToMenus } from '../utilities/other_schemas/drinks_to_menus';

export const menus = pgTable('menus', {
  id: serial('id').primaryKey(),
  title: varchar({ length: 256 }).notNull(),
  createdAt: timestamp().defaultNow(),
  author: integer('user_id').references(() => users.id),
  branchId: integer('branch_id').references(() => branches.id),
});

export const menuRelations = relations(menus, ({ one, many }) => ({
  user: one(users, {
    fields: [menus.author],
    references: [users.id],
  }),
  branch: one(branches, {
    fields: [menus.branchId],
    references: [branches.id],
  }),
  drinksToMenus: many(drinksToMenus),
}));
