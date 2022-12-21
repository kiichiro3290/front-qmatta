import { CommunityPagePresenter } from './presenter'

import { getCommunityUsers } from '~/api/client/back/community'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const CommunityPage: React.FC = () => {
  const router = useRouter()
  const [communityId, setCommunityId] = useState<string>('')
  const [communityUsers, setCommunityusers] = useState<CommunityUser[]>([])

  useEffect(() => {
    if (!communityId) return

    const f = async (communityId: string) => {
      const users = await getCommunityUsers(communityId)
      if (users.error) {
        console.log(users.errorMessage)
      } else {
        setCommunityusers(users.users)
      }
    }
    f(communityId)
  }, [communityId])

  useEffect(() => {
    console.log(router.query)
    setCommunityId(router.query.communityId as string)
  }, [router.query])

  return (
    <CommunityPagePresenter communityId={communityId} users={communityUsers} />
  )
}
