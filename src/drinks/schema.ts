import { relations } from 'drizzle-orm';
import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { drinksToMenus } from '../utilities/other_schemas/drinks_to_menus';
import { drinksToInventory } from '../utilities/other_schemas/drinks_to_inventory';

export const drinks = pgTable('drinks', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const drinksRelations = relations(drinks, ({ many }) => ({
  drinksToMenus: many(drinksToMenus),
  drinksToInventory: many(drinksToInventory),
}));
