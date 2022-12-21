import { QuestionListPagePresenter } from './presenter'

import { getQuestionList } from '~/api/client/back/question'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const QuestionListPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionInfo[]>([])
  const router = useRouter()
  const query = router.query

  useEffect(() => {
    // Questionsってリアルタイムに変化するから，更新されるたびにバックエンドから取得しないといけない?
    const f = async () => {
      const communityId = query.communityId
      if (communityId) {
        const questions = await getQuestionList(communityId as string)
        setQuestions(questions)
      }
    }
    f()
  }, [])
  return <QuestionListPagePresenter questions={questions} />
}
