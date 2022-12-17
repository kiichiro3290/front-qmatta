import { useState } from 'react'

type UseCommunityMenuReturnVal = {
  isShowPostQuestion: boolean
  isShowQuestionList: boolean
  isShowEveryoneStatus: boolean
  showPostQuestion: () => void
  showQuestionList: () => void
  showEveryoneStatus: () => void
}

export const useCommunityMenu = (): UseCommunityMenuReturnVal => {
  const [isShowPostQuestion, setIsShowPostQuestion] = useState<boolean>(false)
  const [isShowQuestionList, setIsShowQuestionList] = useState<boolean>(true)
  const [isShowEveryoneStatus, setIsShowEveryoneStatus] =
    useState<boolean>(false)

  const showPostQuestion = () => {
    setIsShowPostQuestion(true)
    setIsShowQuestionList(false)
    setIsShowEveryoneStatus(false)
    console.log('押した')
  }

  const showQuestionList = () => {
    setIsShowPostQuestion(false)
    setIsShowQuestionList(true)
    setIsShowEveryoneStatus(false)
    console.log('阻止しs')
  }

  const showEveryoneStatus = () => {
    setIsShowPostQuestion(false)
    setIsShowQuestionList(false)
    setIsShowEveryoneStatus(true)
  }

  return {
    isShowPostQuestion,
    isShowQuestionList,
    isShowEveryoneStatus,
    showPostQuestion,
    showQuestionList,
    showEveryoneStatus,
  }
}
