import { getServerSession, type AuthOptions, type User } from "next-auth";
import { redirect } from "next/navigation";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/config/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./prisma";
import { Adapter, AdapterUser } from "next-auth/adapters";

type AuthSession = {
  session: {
    user: {
      id: string;
      email?: string | null;
    };
  } | null;
};

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}

interface NewAdapter extends Adapter {
  id: string;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as NewAdapter,
  callbacks: {
    async jwt({ token, user }) {
      // update token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      // return final token
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_AUTH_ID,
      clientSecret: env.GOOGLE_AUTH_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",

      // @ts-expect-error no type available for this
      async authorize(
        credentials: {
          email: string;
          password: string;
        },
        req
      ) {
        const res = await fetch(`${env.NEXTAUTH_URL}/api/user/login/info`, {
          method: "POST",
          body: JSON.stringify(credentials),
        });
        const user = await res.json();

        if (user) {
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
    newUser: "/setup",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } satisfies AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/login");
};
