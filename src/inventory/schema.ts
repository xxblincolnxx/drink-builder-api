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
import { vendors } from '../vendors/schema';
import { drinksToInventory } from '../utilities/other_schemas/drinks_to_inventory';
import { mixers } from '../mixers/schema';

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
  vendorId: integer('vendor_id').references(() => vendors.id),
  mixerId: integer('mixer_id').references(() => mixers.id),
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
  vendor: one(vendors, {
    fields: [inventory.vendorId],
    references: [vendors.id],
  }),
  mixer: one(mixers, {
    fields: [inventory.mixerId],
    references: [mixers.id],
  }),
  drinksToInventory: many(drinksToInventory),
}));
