import { CommunityPagePresenter } from './presenter'

import { getCommunityUsers } from '~/api/client/back/community'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const CommunityPage: React.FC = () => {
  const router = useRouter()
  const [communityId, setCommunityId] = useState<string>('')
  const [communityUsers, setCommunityusers] = useState<UserList>([])

  useEffect(() => {
    if (!communityId) return

    const f = async (communityId: string) => {
      const res = await getCommunityUsers(communityId)
      if (!res.error && res.users) {
        setCommunityusers(res.users)
      } else {
        console.log(res.errorMessage)
      }
    }
    f(communityId)
  }, [communityId])

  useEffect(() => {
    setCommunityId(router.query.communityId as string)
  }, [router.query])

  return (
    <CommunityPagePresenter communityId={communityId} users={communityUsers} />
  )
}
