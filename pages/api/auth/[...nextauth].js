import Providers from 'next-auth/providers';
import NextAuth from 'next-auth';

export default NextAuth({
  site: 'http://localhost:3000',
  providers: [
    Providers.Spotify({
      clientId: 'cb168bf117a6402d976ab1cc13e21d64',
      clientSecret: '0c4e260fbfbd43889548e804f9b94337',
    }),
    Providers.GitHub({
      clientId: 'Iv1.150cee770a5eb051',
      clientSecret: 'f9fe64b481adbe0c5e27d966ce7fe5e2c43129d9',
    }),
  ],
  callbacks: {
    async jwt(token, _, account) {
      if (account) {
        console.log(account);
        token.provider = account.provider;
        token.id = account.id;
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
      }
      return token;
    },
    async signIn(user, account, profile) {},
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
  events: {
    async signIn(message) {},
  },
});
