import qmattaClient from '..'

// コミュニティの質問一覧を取得する
export const getMockQuestionList = (): MockQuestion[] => {
  const mockQuestions: MockQuestion[] = [
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
/**
 * 質問投稿一覧を取得する：GET
 * @returns QuestionInfo[]
 */
export const getQuestionList = async (): Promise<QuestionInfo[]> => {
  const res = await qmattaClient()
    .get('question')
    .then((res) => res.data)
    .catch((e) => console.log(e))

  return res.questions
}

/**
 * 質問の詳細を取得する：GET
 * @param questionId string
 */
export const getQuestionDetailInfo = async (
  questionId: string
): Promise<QuestionHistory> => {
  const res = await qmattaClient()
    .get(`question/${questionId}`)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return { question: res.question, answer: res.answer }
}

/**
 * 質問を投稿する：POST
 * @param data: Question
 * @returns questionId: string
 */
export const postQuestion = async (data: Question): Promise<string> => {
  const res = await qmattaClient()
    .post('question', data)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res.questionId
}

/**
 * 質問に対して回答を投稿する
 * @param questionId
 * @param data
 * @returns answerId
 */
export const postAnswer = async (
  questionId: string,
  data: Answer
): Promise<string> => {
  const res = await qmattaClient()
    .post(`question/${questionId}`, data)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res.answerId
}
