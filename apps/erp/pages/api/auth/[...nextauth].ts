// @ts-nocheck
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      issuer: "https://nteprojects-erp-cjc3p.eu.auth0.com",
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.AUTH_SECRET,
});
//
