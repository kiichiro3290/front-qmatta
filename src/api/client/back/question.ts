// 仮のデータ構造

export type PriorityType = 'なるはや' | 'いつでも' | '緊急' | 'まったり'
export type StatusType = '解決' | 'クマった' | 'ピンチ' | '回答募集中'

export type Question = {
  title: string
  createdAt: Date
  status: StatusType
  label: string[]
  priority: PriorityType
}

// コミュニティの質問一覧を取得する
export const getMockQuestionList = (): Question[] => {
  const mockQuestions: Question[] = [
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: '緊急',
    },
  ]

  return mockQuestions
}
