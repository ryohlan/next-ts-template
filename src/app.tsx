import React from 'react'
import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app'

interface InitialProps {}

export interface AppProps extends InitialProps {}

const getInitialProps = async ({
  Component,
  ctx
}: NextAppContext): Promise<DefaultAppIProps & InitialProps> => {
  const pageProps =
    Component.getInitialProps && (await Component.getInitialProps(ctx))
  return { pageProps }
}

class MyApp extends App<AppProps> {
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
