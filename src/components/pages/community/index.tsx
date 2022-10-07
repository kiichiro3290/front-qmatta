import { useRouter } from 'next/router'
import { CommunityPagePresenter } from './presenter'

export const CommunityPage: React.FC = () => {
  const router = useRouter()
  const communityId = router.query.toString()
  return <CommunityPagePresenter communityId={communityId} />
}
