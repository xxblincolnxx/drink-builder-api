import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  varchar,
  uuid,
  check,
} from 'drizzle-orm/pg-core';
import { users } from '../users/schema';
import { branches } from '../branches/schema';
import { vendors } from '../vendors/schema';
import { drinksToInventory } from '../utilities/other_schemas/drinks_to_inventory';
import { mixers } from '../mixers/schema';
import { bottles } from '../bottles/schema';

export const inventory = pgTable(
  'inventory',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    description: text('description').notNull(),
    purchased: timestamp('purchased').notNull(),
    isEstimated: boolean('is_estimated').notNull(),
    isDefault: boolean('is_default').notNull(),
    costPerItem: integer('cost_per_item').notNull(),
    currency: varchar('currency').notNull(),
    inStock: integer('in_stock').notNull(),
    buyerId: uuid('buyer_id').references(() => users.id),
    branchId: uuid('branch_id').references(() => branches.id),
    vendorId: uuid('vendor_id').references(() => vendors.id),
    mixerId: uuid('mixer_id').references(() => mixers.id),
    bottleId: uuid('bottle_id').references(() => bottles.id),
  },
  () => [
    check(
      'one_exists_foreign_key',
      sql`(bottle_id IS NOT NULL) OR (mixer_id IS NOT NULL)`,
    ),
    check(
      'two_not_exists_foreign_key',
      sql`(bottle_id IS NULL) OR (mixer_id IS NULL)`,
    ),
  ],
);

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
  bottles: one(bottles, {
    fields: [inventory.bottleId],
    references: [bottles.id],
  }),
  drinksToInventory: many(drinksToInventory),
}));
