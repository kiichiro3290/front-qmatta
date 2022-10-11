import { getBaseLayout } from '~/components/layouts/base'
import { LogInPage } from '~/components/pages/login'
import { NextPageWithLayout } from '~/types/next'

const Login: NextPageWithLayout = () => {
  return (
    <>
      <LogInPage />
    </>
  )
}

Login.getLayout = getBaseLayout

export default Login
