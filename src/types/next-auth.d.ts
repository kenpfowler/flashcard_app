import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      tokenType: "Bearer";
      accessToken: string;
      expiresIn: number;
      refreshToken: string;
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
