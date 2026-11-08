# Database

- Prisma ORM
- PostgreSQL
- AdminerEvo

## Migration

Run `npm run migrate <name>`.

Alternatively you can manually run `npx prisma migrate dev --name <name>` to create migration and then run `npx prisma generate` to update client. This approach will not replace the depracated `SERIAL`.

## Seeding

Run `npm run seed:gallery` to fill the gallery with 1000 published test images from 2015–2026. The files are 16×16 random pixels, the DB rows carry full-size dimensions in common aspect ratios. They are owned by the `seed-gallery@example.invalid` user and stored in `public/galerie/_seed/`. Seeding removes previous test images first, never overwrites a file and stops if the folder holds files it didn't create.

Run `npm run seed:gallery:clean` to remove all test images (the seed user's rows and their files). Real content is never touched.

The database has to be migrated first (`npx prisma generate`).

## Adminer

On port [8080](http://localhost:8080/) is running Adminer. To serve Prisma Studio run `npx prisma studio`.
