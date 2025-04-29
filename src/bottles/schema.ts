import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, varchar, integer } from 'drizzle-orm/pg-core';
import { spirits } from '../spirits/schema';
import { inventory } from '../inventory/schema';

export const bottles = pgTable('bottles', {
  id: uuid('id').primaryKey().defaultRandom(),
  volume_oz: integer('volume_oz').notNull(),
  name: varchar('name', { length: 255 }),
  image: text('image'),
  spiritId: uuid('spirit_id').references(() => spirits.id),
});

export const bottlesRelations = relations(bottles, ({ one, many }) => ({
  spirit: one(spirits, {
    fields: [bottles.spiritId],
    references: [spirits.id],
  }),
  inventory: many(inventory),
}));
