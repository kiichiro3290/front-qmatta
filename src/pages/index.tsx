import Head from 'next/head'
import { getBaseLayout } from '~/components/layouts/base'
import { QmaPage } from '~/components/pages/qma'
import { NextPageWithLayout } from '~/types/next'

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Qmatta</title>
        <meta name='description' content='qmatta' />
        <link rel='icon' href='/quma2.png' />
      </Head>
      <QmaPage />
    </div>
  )
}

Home.getLayout = getBaseLayout

export default Home
