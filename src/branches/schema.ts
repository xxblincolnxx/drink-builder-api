import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { users } from '../users/schema';
import { menus } from '../menus/schema';
import { organizations } from '../organizations/schema';

export const branches = pgTable('branches', {
  id: serial('id').primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  organizationId: integer('organization_id').references(() => organizations.id),
});

export const branchRelations = relations(branches, ({ many, one }) => ({
  members: many(users),
  menus: many(menus),
  organization: one(organizations, {
    fields: [branches.organizationId],
    references: [organizations.id],
  }),
}));

// TODO: Will need Spirit and Mixer inventories too.
