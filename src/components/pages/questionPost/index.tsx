import { QuestionPostPagePresenter } from './presenter'

import { getMessageHistory } from '~/api/client/back/bear'
import {
  getPriorityList,
  getStatusList,
  getCategoryList,
} from '~/api/client/back/question'
import { selectIsLoggedIn } from '~/store/user/userSlice'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const QuestionPostPage: React.FC = () => {
  // reduxで管理している状態
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const router = useRouter()
  const communityId = router.query.communityId

  const [messageHistory, setMessageHistory] = useState<MessageHistory[]>([])
  const [priorityList, setPriorityList] = useState<Priority[]>([])
  const [statusList, setStatusList] = useState<QuestionStatus[]>([])
  const [categoryList, setCategoryList] = useState<Category[]>([])

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
    <QuestionPostPagePresenter
      categoryList={categoryList}
      communityId={communityId as string}
      messageHistory={messageHistory}
      priorityList={priorityList}
      statusList={statusList}
    />
  )
}
