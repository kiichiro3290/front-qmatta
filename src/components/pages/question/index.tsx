import { QuestionPagePresenter } from './presenter'

import { getQuestionHistory } from '~/api/client/back/question'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const QuestionPage: React.FC = () => {
  const [questionHistory, setQuestionHistory] = useState<QuestionHistory>()
  const [questionId, setQuestionId] = useState<string>('')
  const router = useRouter()
  const query = router.query

  useEffect(() => {
    if (!questionId) return

    const f = async () => {
      const res = await getQuestionHistory(questionId)

      if (!res.error && res.questionHistory) {
        setQuestionHistory(res.questionHistory)
      } else {
        console.log(!res.errorMessage)
      }
    }
    f()
  }, [questionId])

  useEffect(() => {
    const id = query.questionId
    if (id) {
      setQuestionId(id as string)
    }
  }, [query])
  return <QuestionPagePresenter questionHistory={questionHistory!} />
}
