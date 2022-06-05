import type { AppProps } from 'next/app';
import '../styles/globals.css';

import ThemeProvider from '~/components/ThemeProvider';
import Tina from '../.tina/components/TinaDynamicProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Tina>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Tina>
  );
}

export default MyApp;
