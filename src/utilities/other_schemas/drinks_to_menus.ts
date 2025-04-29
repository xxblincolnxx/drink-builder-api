import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  varchar,
} from 'drizzle-orm/pg-core';
import { menus } from '../menus/schema';
import { drinks } from '../drinks/schema';
import { relations } from 'drizzle-orm';

export const drinksToMenus = pgTable(
  'drinks_to_menus',
  {
    menuId: integer('menu_id').references(() => menus.id),
    drinkId: integer('drink_id').references(() => drinks.id),
    // intent is to use cents or smallest unit to avoid decimals
    price: integer('price'),
    currency: varchar('currency'),
    isAvailable: boolean('is_available'),
  },
  (t) => [primaryKey({ columns: [t.menuId, t.drinkId] })],
);

export const drinksToMenusRelations = relations(drinksToMenus, ({ one }) => ({
  menu: one(menus, {
    fields: [drinksToMenus.menuId],
    references: [menus.id],
  }),
  drink: one(drinks, {
    fields: [drinksToMenus.drinkId],
    references: [drinks.id],
  }),
}));
