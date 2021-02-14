import { Provider } from 'next-auth/client';

export default function SpotifyProvider({ children, pageProps }) {
  return (
    <Provider
      session={{
        spotify: pageProps.session,
      }}>
      {children}
    </Provider>
  );
}
