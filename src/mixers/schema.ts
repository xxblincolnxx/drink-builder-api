import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { inventory } from '../inventory/schema';
import { categories } from '../categories/schema';

export const mixers = pgTable('mixers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  image: text('image'),
  categoryId: uuid('category_id').references(() => categories.id),
});

export const mixersRelations = relations(mixers, ({ many, one }) => ({
  category: one(categories, {
    fields: [mixers.categoryId],
    references: [categories.id],
  }),
  inventory: many(inventory),
}));
