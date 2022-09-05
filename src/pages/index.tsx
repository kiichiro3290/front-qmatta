import type { NextPage } from 'next'
import Head from 'next/head'
import { QmaPage } from '~/components/pages/qma'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Qmatta作成予定地</title>
        <meta name='description' content='qmatta 作成予定地' />
        <link rel='icon' href='/quma2.png' />
      </Head>
      <QmaPage />
    </div>
  )
}

export default Home
