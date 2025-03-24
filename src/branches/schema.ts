import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { users } from '../users/schema';

export const branches = pgTable('branches', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 256 }).notNull(),
});

export const branchRelations = relations(branches, ({ many }) => ({
  users: many(users),
}));

// TODO: Will need Spirit and Mixer inventories too.
