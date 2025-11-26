# Database

- Prisma ORM
- PostgreSQL
- AdminerEvo

## Migration

Run `npm run migrate <name>`.

Alternatively you can manually run `npx prisma migrate dev --name <name>` to create migration and then run `npx prisma generate` to update client.

## Adminer

On port [8080](http://localhost:8080/) is running Adminer. To serve Prisma Studio run `npx prisma studio`.
