import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from '../users/schema';
import { branches } from '../branches/schema';
import { drinksToInventory } from '../other_schemas/drinks_to_inventory';

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  purchased: timestamp('purchased').notNull(),
  isEstimated: boolean('is_estimated').notNull(),
  isDefault: boolean('is_default').notNull(),
  costPerItem: integer('cost_per_item').notNull(),
  currency: varchar('currency').notNull(),
  inStock: integer('in_stock').notNull(),
  buyerId: integer('buyer_id').references(() => users.id),
  branchId: integer('branch_id').references(() => branches.id),
});

export const inventoryRelations = relations(inventory, ({ one, many }) => ({
  buyer: one(users, {
    fields: [inventory.buyerId],
    references: [users.id],
  }),
  branch: one(branches, {
    fields: [inventory.branchId],
    references: [branches.id],
  }),
  drinksToInventory: many(drinksToInventory),
}));
