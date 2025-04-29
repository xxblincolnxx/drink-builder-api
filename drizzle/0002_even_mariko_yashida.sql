ALTER TABLE "inventory" DROP CONSTRAINT "check_one_foreign_key";--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "one_exists_foreign_key" CHECK ((bottle_id IS NOT NULL) OR (mixer_id IS NOT NULL));--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "two_not_exists_foreign_key" CHECK ((bottle_id IS NULL) OR (mixer_id IS NULL));