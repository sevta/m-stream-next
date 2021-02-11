import { StoreProvider } from 'easy-peasy';

import '../styles/globals.css';
import { store } from '../store';
import Layout from './Layout';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
