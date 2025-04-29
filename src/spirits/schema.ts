import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';
import { categories } from '../categories/schema';

export const spirits = pgTable('spirits', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  distiller: varchar('distiller', { length: 255 }).notNull(),
  proof: varchar('proof', { length: 255 }).notNull(),
  image: text('image'),
  categoryId: integer('category_id').references(() => categories.id),
});

export const spiritsRelations = relations(spirits, ({ one }) => ({
  category: one(categories, {
    fields: [spirits.categoryId],
    references: [categories.id],
  }),
}));
