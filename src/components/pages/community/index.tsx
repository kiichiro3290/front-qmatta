import { CommunityPagePresenter } from './presenter'

import { useRouter } from 'next/router'

export const CommunityPage: React.FC = () => {
  const router = useRouter()
  const communityId = router.query.toString()

  return <CommunityPagePresenter communityId={communityId} />
}
