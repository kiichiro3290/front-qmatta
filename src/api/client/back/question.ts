// コミュニティの質問一覧を取得する
export const getMockQuestionList = (): Question[] => {
  const mockQuestions: Question[] = [
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'ピンチ',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'botが同じセリフばかり返してくる',
      createdAt: new Date(),
      status: '解決',
      label: ['bot'],
      priority: 'いつでも',
    },
    {
      title: 'CORSエラーが出ます，助けてください',
      createdAt: new Date(),
      status: 'クマった',
      label: ['フロントエンド'],
      priority: 'なるはや',
    },
    {
      title: 'page not found',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: 'まったり',
    },
    {
      title: '404エラーが出る',
      createdAt: new Date(),
      status: '回答募集中',
      label: ['JavaScript'],
      priority: 'なるはや',
    },
    {
      title: 'コンパイルが通らない',
      createdAt: new Date(),
      status: 'ピンチ',
      label: ['プログラミング'],
      priority: '緊急',
    },
    {
      title: 'botが同じセリフばかり返してくる',
      createdAt: new Date(),
      status: '解決',
      label: ['bot'],
      priority: 'いつでも',
    },
    {
      title: 'CORSエラーが出ます，助けてください',
      createdAt: new Date(),
      status: 'クマった',
      label: ['フロントエンド'],
      priority: 'なるはや',
    },
    {
      title: 'page not found',
      createdAt: new Date(),
      status: 'クマった',
      label: ['プログラミング'],
      priority: 'まったり',
    },
    {
      title: '404エラーが出る',
      createdAt: new Date(),
      status: '回答募集中',
      label: ['JavaScript'],
      priority: 'なるはや',
    },
  ]

  return mockQuestions
}
