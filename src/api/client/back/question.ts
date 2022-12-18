import qmattaClient from '..'

// コミュニティの質問一覧を取得する
export const getMockQuestionList = (): QuestionInfo[] => {
  const mockQuestions: QuestionInfo[] = [
    {
      questionId: 'aaaaa',
      title: 'ものすっごいエラーが出て困ってる',
      category: ['python'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: 'botが同じセリフばかり返してくる',
      category: ['chatGPT'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: 'CORSエラーが出ます助けてください',
      category: ['chatGPT'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: 'page not found',
      category: ['chatGPT'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: '404エラーが出る',
      category: ['chatGPT'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: 'ものすっごいエラーが出て困ってる',
      category: ['python'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: 'botが同じセリフばかり返してくる',
      category: ['chatGPT'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: 'CORSエラーが出ます助けてください',
      category: ['JavaScript'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: 'page not found',
      category: ['chatGPT'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    {
      questionId: 'aaaaa',
      title: '404エラーが出る',
      category: ['chatGPT'],
      questioner: '誰？', // 質問者のuserId??
      numLikis: 100, // いいねの数
    },
    // },
    // {
    //   title: '404エラーが出る',
    //   createdAt: new Date(),
    //   status: '回答募集中',
    //   label: ['JavaScript'],
    //   priority: 'なるはや',
    // },
  ]

  return mockQuestions
}
/**
 * 質問投稿一覧を取得する：GET
 * @returns QuestionInfo[]
 */
export const getQuestionList = async (
  communityId: string
): Promise<QuestionInfo[]> => {
  const body = { communityId }
  const res = await qmattaClient()
    .post('question', body)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  console.log(res)
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
