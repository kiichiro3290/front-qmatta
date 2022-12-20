import { QuestionListPagePresenter } from './presenter'

import { getQuestionList } from '~/api/client/back/question'

import { useEffect, useState } from 'react'

export const QuestionListPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionInfo[]>([])

  useEffect(() => {
    // Questionsってリアルタイムに変化するから，更新されるたびにバックエンドから取得しないといけない?
    const f = async () => {
      // 今はAPIが叩けなくてエラーが出る
      const mockCommunityId = '639e1e8803161570622d5263'
      const questions = await getQuestionList(mockCommunityId)
      setQuestions(questions)
    }
    f()
  }, [])
  return <QuestionListPagePresenter questions={questions} />
}
