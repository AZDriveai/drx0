import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '../../lib/db';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Guest',
      credentials: {},
      async authorize() {
        // Allow guest access
        return {
          id: 'guest',
          name: 'Guest User',
          email: 'guest@example.com',
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (token && session.user) {
        session.user.id = token.sub || user?.id || 'guest';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function auth() {
  // For development - return a mock user
  return {
    user: {
      id: 'dev-user',
      name: 'Development User',
      email: 'dev@example.com',
      image: null,
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}