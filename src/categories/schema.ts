import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { mixers } from '../mixers/schema';

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  mixers: many(mixers),
}));
