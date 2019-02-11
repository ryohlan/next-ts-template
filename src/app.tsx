import React from 'react'
import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app'
import { RouterProps } from 'next/router'

export interface AppInitialProps {}

export interface AppProps<Q> extends AppInitialProps {
  router: RouterProps<Q>
}

const getInitialProps = async ({
  Component,
  ctx
}: NextAppContext): Promise<DefaultAppIProps & AppInitialProps> => {
  const initialProps: AppInitialProps = {}

  const pageProps =
    Component.getInitialProps &&
    (await Component.getInitialProps({ ...ctx, ...initialProps }))

  return { pageProps, ...initialProps }
}

class MyApp extends App<AppProps<any>> {
  static getInitialProps = getInitialProps

  render() {
    const { Component, pageProps, ...otherProps } = this.props
    return (
      <Container>
        <Component {...pageProps} {...otherProps} />
      </Container>
    )
  }
}

export default MyApp
