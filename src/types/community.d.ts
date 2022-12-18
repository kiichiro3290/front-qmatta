// 仮のデータ構造
type PriorityType = 'なるはや' | 'いつでも' | '緊急' | 'まったり'
type StatusType = '解決' | 'クマった' | 'ピンチ' | '回答募集中'

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
}

type QuestionHistory = {
  question: Question
  answer: Answer[]
}

type Question = {
  questioner: string // 質問者の名前
  title: string
  detail: string // 質問内容
  image: string[][] // TODO:バイト列
  category: string[]
  status: string
  priority: string
  likes: {
    user_name: string
    icon: string[] //TODO:バイト列
  }
}

type Answer = {
  respondent: string // 回答者名
  detail: string // 回答内容
  image: striing[][] // TODO: バイト列
  likes: {
    userName: string
    icon: string[] // TODO: バイト列
  }
}
