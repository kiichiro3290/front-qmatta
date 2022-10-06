import type { NextPage } from 'next'
import Head from 'next/head'
import { QmaPage } from '~/components/pages/qma'

const Home: NextPage = () => {
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

export default Home
