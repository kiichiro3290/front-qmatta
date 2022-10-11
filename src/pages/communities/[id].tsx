import { getBaseLayout } from '~/components/layouts/base'
import { CommunityPage } from '~/components/pages/community'
import { NextPageWithLayout } from '~/types/next'

const Community: NextPageWithLayout = () => {
  return (
    <>
      <CommunityPage />
    </>
  )
}

Community.getLayout = getBaseLayout

export default Community
