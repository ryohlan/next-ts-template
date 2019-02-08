import React from 'react'
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document<any> {
  static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()

    return { ...initialProps, ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,viewport-fit=cover"
          />
          <meta name="description" content="" />
          <link
            rel="stylesheet"
            href="https://cdn.rawgit.com/filipelinhares/ress/master/dist/ress.min.css"
          />
          <link rel="stylesheet" href="/static/styles/default.css" />
          <link rel="manifest" href="/static/manifest/manifest.json" />
          <link rel="manifest" href="manifest.webmanifest" />
          <script
            async
            src="https://cdn.jsdelivr.net/npm/pwacompat@2.0.7/pwacompat.min.js"
            integrity="sha384-ptgwb3/v69WGur7IwSnWOowVxE7hcRB3DG/EiHdejrw2sFNwUHynFbiRMPxc4hdS"
            crossOrigin="anonymous"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
