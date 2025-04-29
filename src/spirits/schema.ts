import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { categories } from '../categories/schema';
import { bottles } from '../bottles/schema';

export const spirits = pgTable('spirits', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  distiller: varchar('distiller', { length: 255 }).notNull(),
  proof: varchar('proof', { length: 255 }).notNull(),
  image: text('image'),
  categoryId: uuid('category_id').references(() => categories.id),
});

export const spiritsRelations = relations(spirits, ({ one, many }) => ({
  category: one(categories, {
    fields: [spirits.categoryId],
    references: [categories.id],
  }),
  bottles: many(bottles),
}));
