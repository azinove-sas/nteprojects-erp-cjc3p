// @ts-nocheck
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { ref, get, set, update, push } from "firebase/database";
import { getDatabase } from "firebase/database";
import FirebaseApp from "azinove/libraries/Firebase";
import getDate from "azinove/utils/getDate";
import { ROLE } from "@constant/rolesList";
const permissions = {
  dashboard: {
    perms: {
      access: true,
    },
  },
  crm: {
    "(id)": {
      perms: {
        access: false,
      },
    },
    perms: {
      access: false,
      add: false,
    },
  },
};

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
      const newDate = new Date().toJSON();

      // If not exist in the REALTIME Database
      if (res === null) {
        set(ref(DB, "/USERS/" + user.id), {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: ROLE.default,
          permissions: permissions,
          lastLogin: new Date(),
        });
        push(ref(DB, "/LOGS/" + getDate()), {
          message: "[LOG] " + newDate + ": " + user.name + " connected",
        });
        user.id = user.id;
        user.permissions = permissions;
        user.role = ROLE.default;
      } else {
        update(ref(DB, "/USERS/" + res.id), {
          lastLogin: newDate,
        });
        push(ref(DB, "/LOGS/" + getDate()), {
          message: "[LOG] " + newDate + ": " + res.name + " connected",
        });

        user.id = res.id;
        user.permissions = res.permissions;
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
          permissions: user.permissions,
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
