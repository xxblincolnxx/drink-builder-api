## Local Development:

You need to spin up an docker image of postgres and provide the correct URL to the .env:
URL: `postgresql://postgres:<PASSWORD>@localhost:5432/drinkbuilder`
FROM TERMINAL: `docker compose up`

Handy Commands:

DRIZZLE:

```bash
# Push or schema and subsequent changes directly to database
npx drizzle-kit push

# alternative:
# make migrations
npx drizzle-kit generate
# apply migrations
npx drizzle-kit migrate
```

NEST:

```bash
# generate module, controller, then service
nest g module <schema-name>
nest g controller <schema-name>
nest g service <schema-name>
```
