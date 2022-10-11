import { getBaseLayout } from '~/components/layouts/base'
import { SignUpPage } from '~/components/pages/signup'
import { NextPageWithLayout } from '~/types/next'

const SignUp: NextPageWithLayout = () => {
  return (
    <>
      <SignUpPage />
    </>
  )
}

SignUp.getLayout = getBaseLayout

export default SignUp
