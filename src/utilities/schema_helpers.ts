import { timestamp, integer } from 'drizzle-orm/pg-core';

export function auditedColumns() {
  return {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdBy: integer('created_by'),
  };
}
