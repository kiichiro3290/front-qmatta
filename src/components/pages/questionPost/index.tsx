import { QuestionPostPagePresenter } from './presenter'

import {
  getCategoryList,
  getPriorityList,
  getStatusList,
} from '~/api/client/back/question'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const QuestionPostPage: React.FC = () => {
  // reduxで管理している状態
  const router = useRouter()
  const communityId = router.query.communityId

  const [priorityList, setPriorityList] = useState<Priority[]>([])
  const [statusList, setStatusList] = useState<QuestionStatus[]>([])
  const [categoryList, setCategoryList] = useState<Category[]>([])

  // 選択できる優先度の一覧を取得する
  useEffect(() => {
    const f = async () => {
      const res = await getPriorityList()
      if (!res.error && res.priorityList) {
        setPriorityList(res.priorityList)
      } else {
        console.log(res.errorMessage)
      }
    }
    f()
  }, [])

  // 選択できるステータスの一覧を取得する
  useEffect(() => {
    const f = async () => {
      const res = await getStatusList()
      if (!res.error && res.statusList) {
        setStatusList(res.statusList)
      } else {
        console.log(res.errorMessage)
      }
    }
    f()
  }, [])

  // 選択できるカテゴリーの一覧を取得する
  useEffect(() => {
    const f = async () => {
      const res = await getCategoryList()
      if (!res.error && res.categoryList) {
        setCategoryList(res.categoryList)
      } else {
        console.log(res.errorMessage)
      }
    }
    f()
  }, [])

  return (
    <QuestionPostPagePresenter
      categoryList={categoryList}
      communityId={communityId as string}
      priorityList={priorityList}
      statusList={statusList}
    />
  )
}
