import { CommunityPagePresenter } from './presenter'

import { getMessageHistory } from '~/api/client/back/bear'
// getQuestionList, TODO: APIの修正
import { getMockQuestionList } from '~/api/client/back/question'
import { selectIsLoggedIn } from '~/store/user/userSlice'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const CommunityPage: React.FC = () => {
  const router = useRouter()
  const communityId = router.query.toString()

  // reduxで管理している状態
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const [questions, setQuestions] = useState<QuestionInfo[]>([])

  const [messageHistory, setMessageHistory] = useState<MessageHistory[]>([])

  useEffect(() => {
    // Questionsってリアルタイムに変化するから，更新されるたびにバックエンドから取得しないといけない?
    const f = async () => {
      // 今はAPIが叩けなくてエラーが出る
      // const questions = await getQuestionList(communityId)

      // questionに何も入ってなかった時
      if (questions.length == 0) {
        const mockQuestions = getMockQuestionList()
        setQuestions(mockQuestions)
      } else {
        setQuestions(questions)
      }
    }
    f()
  }, [questions])

  // メッセージの送信履歴を取得する
  useEffect(() => {
    const f = async () => {
      const data = await getMessageHistory()
      setMessageHistory(data)
    }
    f()
  }, [isLoggedIn])
  return (
    <CommunityPagePresenter
      communityId={communityId}
      messageHistory={messageHistory}
      questions={questions}
    />
  )
}
