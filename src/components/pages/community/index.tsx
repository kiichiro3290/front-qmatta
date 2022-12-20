import { CommunityPagePresenter } from './presenter'

import { getMessageHistory } from '~/api/client/back/bear'
// getQuestionList, TODO: APIの修正
import {
  getCategoryList,
  getPriorityList,
  getQuestionList,
  getStatusList,
} from '~/api/client/back/question'
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
  const [priorityList, setPriorityList] = useState<Priority[]>([])
  const [statusList, setStatusList] = useState<QuestionStatus[]>([])
  const [categoryList, setCategoryList] = useState<Category[]>([])

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

  // メッセージの送信履歴を取得する
  useEffect(() => {
    const f = async () => {
      const data = await getMessageHistory()
      setMessageHistory(data)
    }
    f()
  }, [isLoggedIn])

  // 選択できる優先度の一覧を取得する
  useEffect(() => {
    const f = async () => {
      const priorityList = await getPriorityList()
      setPriorityList(priorityList)
    }
    f()
  }, [])

  // 選択できるステータスの一覧を取得する
  useEffect(() => {
    const f = async () => {
      const statusList = await getStatusList()
      setStatusList(statusList)
    }
    f()
  }, [])

  // 選択できるカテゴリーの一覧を取得する？？
  useEffect(() => {
    const f = async () => {
      const categoryList = await getCategoryList()
      setCategoryList(categoryList)
    }
    f()
  }, [])

  return (
    <CommunityPagePresenter
      categoryList={categoryList}
      communityId={communityId}
      messageHistory={messageHistory}
      priorityList={priorityList}
      questions={questions}
      statusList={statusList}
    />
  )
}
