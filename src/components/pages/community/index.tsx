import { CommunityPagePresenter } from './presenter'

import { getMockQuestionList } from '~/api/client/back/question'
import { getMessageHistory } from '~/api/client/back/user'
import { selectIsLoggedIn, selectUserId } from '~/store/user/userSlice'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const CommunityPage: React.FC = () => {
  const router = useRouter()
  const communityId = router.query.toString()

  // reduxで管理している状態
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const userId = useSelector(selectUserId)

  const [questions, setQuestions] = useState<Question[]>([])
  const [messageHistory, setMessageHistory] = useState<MessageHistory>({
    messages: [],
    dates: [],
  })

  useEffect(() => {
    // Questionsってリアルタイムに変化するから，更新されるたびにバックエンドから取得しないといけない?
    const f = async () => {
      const questions = getMockQuestionList()
      setQuestions(questions)
    }
    f()
  }, [])

  // メッセージの送信履歴を取得する
  useEffect(() => {
    const f = async () => {
      if (userId) {
        const data = await getMessageHistory(userId)
        console.log(data)
        setMessageHistory(data)
      }
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
