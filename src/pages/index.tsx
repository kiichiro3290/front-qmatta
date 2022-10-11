import { getBaseLayout } from '~/components/layouts/base'
import { QmaPage } from '~/components/pages/qma'
import { NextPageWithLayout } from '~/types/next'

import Head from 'next/head'

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Qmatta</title>
        <meta content='qmatta' name='description' />
        <link href='/quma2.png' rel='icon' />
      </Head>
      <QmaPage />
    </div>
  )
}

Home.getLayout = getBaseLayout

export default Home
