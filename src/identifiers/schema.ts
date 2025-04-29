import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { spirits } from '../spirits/schema';

export const identifiers = pgTable('identifiers', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type', { length: 255 }),
  value: varchar('value', { length: 255 }),
  spiritId: uuid('spirit_id').references(() => spirits.id),
});

export const identifiersRelations = relations(identifiers, ({ one }) => ({
  spirits: one(spirits, {
    fields: [identifiers.spiritId],
    references: [spirits.id],
  }),
}));
