import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import { loadSecret } from './utilities/load-secret';
import { prisma } from './db/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: loadSecret('AUTH_SECRET_FILE'),
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: loadSecret('GOOGLE_SECRET_FILE'),
    }),
  ],
});
