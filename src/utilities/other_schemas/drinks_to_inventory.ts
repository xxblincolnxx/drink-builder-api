import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';
import { inventory } from '../inventory/schema';
import { drinks } from '../drinks/schema';
import { relations } from 'drizzle-orm';

export const drinksToInventory = pgTable(
  'drinks_to_inventory',
  {
    inventoryId: integer('inventory_id').references(() => inventory.id),
    drinkId: integer('drink_id').references(() => drinks.id),
    // This will be the amount used in a drink recipe. Use the unit to determine what the amount is of.
    amount: integer('amount'),
    unit: varchar('unit'),
  },
  (t) => [primaryKey({ columns: [t.inventoryId, t.drinkId] })],
);

export const drinksToInventoriesRelations = relations(
  drinksToInventory,
  ({ one }) => ({
    inventory: one(inventory, {
      fields: [drinksToInventory.inventoryId],
      references: [inventory.id],
    }),
    drink: one(drinks, {
      fields: [drinksToInventory.drinkId],
      references: [drinks.id],
    }),
  }),
);
