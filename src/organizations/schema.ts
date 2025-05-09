import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { branches } from '../branches/schema';

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey(),
  name: varchar({ length: 256 }).notNull(),
});

export const organizationRelations = relations(organizations, ({ many }) => ({
  branches: many(branches),
}));
