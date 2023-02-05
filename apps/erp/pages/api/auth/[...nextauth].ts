// @ts-nocheck
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { ref, get, set, update } from "firebase/database";
import { getDatabase } from "firebase/database";
import FirebaseApp from "azinove/libraries/Firebase";
import { ROLE } from "@constant/rolesList";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Auth0Provider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      issuer: "https://nteprojects-erp-cjc3p.eu.auth0.com",
      authorizationUrl: `https://${process.env.AUTH0_DOMAIN}/authorize?response_type=code&prompt=consent`,
    }),
  ],
  // All of this is just to add user information to be accessible for our app in the token/session
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const DB = getDatabase(FirebaseApp);

      const res: any = (await get(ref(DB, "/USERS/" + user.id))).toJSON();

      // If not exist in the REALTIME Database
      if (res === null) {
        set(ref(DB, "/USERS/" + user.id), {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: ROLE.default,
          lastLogin: new Date(),
        });
        user.id = res.id;
        user.role = res.role;
      } else {
        update(ref(DB, "/USERS/" + user.id), {
          lastLogin: new Date(),
        });

        user.id = res.id;
        user.role = res.role;
      }
      return true;
    },

    // We can pass in additional information from the user document MongoDB returns
    // This could be avatars, role, display name, etc...
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      }
      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.AUTH_SECRET,
});
//
