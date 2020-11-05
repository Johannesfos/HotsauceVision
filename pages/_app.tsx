import { Layout } from '../frontend/components/layout/layout'
import { AppProps } from 'next/app'
import 'semantic-ui-css/semantic.min.css'

function MyApp(props: AppProps) {
  console.log(props.router.query)
  const { Component } = props
  return (
    <Layout>
      <Component {...props.pageProps} />
    </Layout>
  )
}

export default MyApp
