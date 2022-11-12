import { CommunityPagePresenter } from './presenter'

import { getMockQuestionList } from '~/api/client/back/question'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const CommunityPage: React.FC = () => {
  const router = useRouter()
  const communityId = router.query.toString()

  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    // Questionsってリアルタイムに変化するから，更新されるたびにバックエンドから取得しないといけない?
    const f = async () => {
      const questions = getMockQuestionList()
      setQuestions(questions)
    }
    f()
  }, [])
  return (
    <CommunityPagePresenter communityId={communityId} questions={questions} />
  )
}
