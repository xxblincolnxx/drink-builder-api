CREATE TABLE "menus" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"user_id" integer
);
--> statement-breakpoint
ALTER TABLE "menus" ADD CONSTRAINT "menus_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;