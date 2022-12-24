// 仮のデータ構造
type PriorityType = 'なるはや' | 'いつでも' | '緊急' | 'まったり'
type StatusType = '解決' | 'クマった' | 'ピンチ' | '回答募集中'

type Community = {
  communityId: string
  communityName: string
  icon: string
}

type MockQuestion = {
  title: string
  createdAt: Date
  status: StatusType
  label: string[]
  priority: PriorityType
}

type QuestionInfo = {
  questionId: string
  title: string
  category: string[]
  questioner: string // 質問者のuserId??
  numLikis: number // いいねの数
  priority: string
  status: string
  createdAt: string
}

type QuestionHistory = {
  question: Question
  answers: Answer[]
}

type Question = {
  questionId: string
  questioner: string // 質問者の名前
  title: string
  details: string // 質問内容
  image: string[] // TODO:バイト列
  category: string[]
  status: string
  priority: string
  likes: {
    user_name: string
    icon: string[] //TODO:バイト列
  }
  createdAt: string
}

type PostQuestion = {
  title: string
  detail: string
  image: string[]
  priorityId: string
  statusId: string
  categoryIdArray: string[]
}

type PostQuestionInput = {
  title: string
  detail: string
  image: string[]
  priority: { label: string; priorityId: string }
  status: { label: string; statusId: string }
  categoryArray: { label: string; categoryId: string }[]
}

type Answer = {
  answerId: string
  respondent: string // 回答者名
  detail: string // 回答内容
  image: striing[][] // TODO: バイト列
  likes: {
    userName: string
    icon: string[] // TODO: バイト列
  }
  createdAt: string
}

type PostAnswer = {
  detail: string
  image: string[]
}

type Priority = {
  priorityId: string
  label: string
}

type QuestionStatus = {
  statusId: string
  label: string
}

type Category = {
  categoryId: string
  label: string
}

type CommunityUser = [userName: string, status: string, icon: string]
