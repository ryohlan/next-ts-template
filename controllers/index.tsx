import React from 'react'
import { NextContext } from 'next'
import { AppProps } from '@src/app'
import Layout from '@layouts/index'

interface InitialProps {}

type Query = {}

const getInitialProps = async ({

}: NextContext<Query> & AppProps): Promise<InitialProps> => {
  return {}
}

const Page = ({  }: AppProps & InitialProps) => <Layout />

Page.getInitialProps = getInitialProps

export default Page
