import type { AppProps } from 'next/app';
import dynamic from "next/dynamic";

import '../styles/globals.css';

import ThemeProvider from '~/components/ThemeProvider';
import { isBrowser } from "~/lib/is-browser";

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
  if (!isBrowser()) {
    return <>{props.children}</>;
  }

  const useTina = shouldUseTinaEditor();

  if (useTina) {
    const Tina = dynamic(()=> import('../.tina/components/TinaDynamicProvider'));

    return  (
      <Tina>
        {props.children}
      </Tina>
    );
  }

  return <>{props.children}</>;
}

function shouldUseTinaEditor() {
  return new URLSearchParams(window.location.search).has('tina');
}

export default MyApp;
