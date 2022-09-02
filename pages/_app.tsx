import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import '../styles/globals.css';

import ThemeProvider from '~/components/ThemeProvider';
import shouldUseTinaEditor from "~/lib/should-use-tina-editor";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TinaWrapper>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </TinaWrapper>
  );
}

function TinaWrapper(props: React.PropsWithChildren<{}>) {
  if (shouldUseTinaEditor()) {
    const Tina = dynamic(
      () => import('../.tina/components/TinaDynamicProvider'),
      {
        ssr: false,
      }
    );

    return <Tina>{props.children}</Tina>;
  }

  return <>{props.children}</>;
}

export default MyApp;
