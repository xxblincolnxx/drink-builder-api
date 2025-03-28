import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { drinksToMenus } from '../other_schemas/drinks_to_menus';

export const drinks = pgTable('drinks', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const drinksRelations = relations(drinks, ({ many }) => ({
  drinksToMenus: many(drinksToMenus),
}));
