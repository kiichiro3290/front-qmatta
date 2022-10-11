import { Fragment } from 'react'
import { AppPropsWithLayout } from '~/types/next'

const MyApp: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page
    })

  return <Fragment>{getLayout(<Component {...pageProps} />)}</Fragment>
}

export default MyApp
