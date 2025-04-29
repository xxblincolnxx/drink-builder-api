import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { inventory } from '../inventory/schema';

export const mixers = pgTable('mixers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  image: text('image'),
});

export const vendorsRelations = relations(mixers, ({ many }) => ({
  inventory: many(inventory),
}));
