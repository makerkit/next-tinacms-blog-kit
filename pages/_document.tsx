import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@300;400;500;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;
