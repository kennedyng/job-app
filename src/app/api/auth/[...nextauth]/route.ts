import NextAuth from "next-auth/next";

import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let user = null;

        const { email, password } = credentials as any;
        const res = await axios.post("/api/user/login", {
          email: email,
          password: password,
        });

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },

  secrete: "project",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
