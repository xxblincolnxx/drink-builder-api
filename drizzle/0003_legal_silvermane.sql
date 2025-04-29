CREATE TABLE "identifiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(255),
	"value" varchar(255),
	"spirit_id" uuid
);
--> statement-breakpoint
ALTER TABLE "identifiers" ADD CONSTRAINT "identifiers_spirit_id_spirits_id_fk" FOREIGN KEY ("spirit_id") REFERENCES "public"."spirits"("id") ON DELETE no action ON UPDATE no action;