export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
}

declare module "next-auth" {
  interface User {
    userData?: UserData;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userData?: UserData;
  }
}
