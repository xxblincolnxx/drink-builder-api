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

export const menus = pgTable('menus', {
  id: serial('id').primaryKey(),
  title: varchar({ length: 256 }).notNull(),
  createdAt: timestamp().defaultNow(),
  userId: integer('user_id').references(() => users.id),
  branchId: integer('branch_id').references(() => branches.id),
});

export const menuRelations = relations(menus, ({ one }) => ({
  user: one(users, {
    fields: [menus.userId],
    references: [users.id],
  }),
  branch: one(branches, {
    fields: [menus.branchId],
    references: [branches.id],
  }),
}));
