import { Layout } from '../frontend/components/layout/layout'
import 'semantic-ui-css/semantic.min.css'

function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
