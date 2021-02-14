import Providers from 'next-auth/providers';
import NextAuth from 'next-auth';
import { spotifyApi } from '../../../utils/spotify';
import { session } from 'next-auth/client';

export default NextAuth({
  site: 'http://localhost:3000',
  providers: [
    Providers.Spotify({
      clientId: 'cb168bf117a6402d976ab1cc13e21d64',
      clientSecret: '0c4e260fbfbd43889548e804f9b94337',
    }),
  ],
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
  events: {
    async signIn(message) {
      console.log({ message }, 'token', message.account.access_token);
      let { access_token, refresh_token } = message.account;

      session.access_token = access_token;
      session.refresh_token = refresh_token;

      console.log('spotify token', session);
    },
  },
});
