import { StoreProvider } from 'easy-peasy';
import { Provider, session } from 'next-auth/client';

import '../styles/globals.css';
import { store } from '../store';
import Layout from './Layout';
import { useEffect, useState } from 'react';

function App({ Component, pageProps, spotifyProfile }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log({ spotifyProfile });
    store.dispatch.spotify.setUser({
      ...spotifyProfile,
    });
    setLoading(false);

    console.log(pageProps);
  }, [spotifyProfile]);

  return (
    <Provider session={pageProps.session}>
      <StoreProvider store={store}>
        {loading ? (
          <div className='w-full min-h-screen flex items-center justify-center text-5xl font-medium'>
            Loading
          </div>
        ) : (
          <Layout>
            <Component {...pageProps} spotifyProfile={spotifyProfile} />
          </Layout>
        )}
      </StoreProvider>
    </Provider>
  );
}

// MyApp.getInitialProps = async () => {
//   console.log('context initial props');
//   const resp = await fetch('http://localhost:3000/api/spotify/me');
//   const data = await resp.json();
//   let spotifyProfile = {};

//   if (!data.body.error) {
//     spotifyProfile.display_name = data.body.display_name;
//     spotifyProfile.id = data.body.id;
//   }

//   console.log(spotifyProfile);

//   return { spotifyProfile };
// };

export default App;
