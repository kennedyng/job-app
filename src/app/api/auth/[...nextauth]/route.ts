import NextAuth from "next-auth/next";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JsonWebTokenError } from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        return (
          axios
            .post(`${process.env.NEXTAUTH_URL}/api/user/login`, {
              email,
              password,
            })
            .then((response) => {
              console.log("response =>", response.data);
              return response.data;
            })
            .catch((error) => {
              if (error.response.status === 409) {
                throw new Error("Wrong Password or Email");
              }
              throw new Error(error.response.data.message);
            }) || null
        );
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userData = {
          country: "zambia",
          firstName: "kennedy",
          lastName: "ngosa",
          id: "1",
        };
      }
      return token;
    },
    session({ session, token, user }) {
      if (token && session.user) {
        session.user.userData = token.userData;
      }
      return session;
    },
  },
  secret: "project",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
