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
      const data = await getQuestionHistory(questionId)

      if (data.error) {
        console.log(data.errorMessage)
      } else {
        setQuestionHistory(data.questionHistory)
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
