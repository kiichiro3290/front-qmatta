import qmattaClient from '..'

// コミュニティの質問一覧を取得する
// export const getMockQuestionList = (): QuestionInfo[] => {
//   const mockQuestions: QuestionInfo[] = [
//     {
//       questionId: 'aaaaa',
//       title: 'ものすっごいエラーが出て困ってる',
//       category: ['python'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: 'botが同じセリフばかり返してくる',
//       category: ['chatGPT'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: 'CORSエラーが出ます助けてください',
//       category: ['chatGPT'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: 'page not found',
//       category: ['chatGPT'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: '404エラーが出る',
//       category: ['chatGPT'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: 'ものすっごいエラーが出て困ってる',
//       category: ['python'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: 'botが同じセリフばかり返してくる',
//       category: ['chatGPT'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: 'CORSエラーが出ます助けてください',
//       category: ['JavaScript'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: 'page not found',
//       category: ['chatGPT'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//     {
//       questionId: 'aaaaa',
//       title: '404エラーが出る',
//       category: ['chatGPT'],
//       questioner: '誰？', // 質問者のuserId??
//       numLikis: 100, // いいねの数
//       priority: 'なるはや',
//       status: '解決済み',
//     },
//   ]

//   return mockQuestions
// }

export const getMockPriorityList = (): Priority[] => {
  const mockPriorityList: Priority[] = [
    {
      priorityId: 'abcde',
      label: 'なるはや',
    },
    {
      priorityId: 'ddddd',
      label: 'まったり',
    },
  ]
  return mockPriorityList
}

export const getMockStatusList = (): QuestionStatus[] => {
  const mockStatusList: QuestionStatus[] = [
    {
      statusId: 'aaaaa',
      label: '解決済み',
    },
    {
      statusId: 'cbbbbb',
      label: '回答募集',
    },
  ]

  return mockStatusList
}

export const getMockCategoryList = (): Category[] => {
  const mockCategoryList: Category[] = [
    {
      categoryId: 'aaaaiiii',
      label: 'GO',
    },
    {
      categoryId: 'eeeee',
      label: 'React',
    },
  ]
  return mockCategoryList
}

/**
 * 質問投稿一覧を取得する：GET
 * @returns QuestionInfo[]
 */
export const getQuestionList = async (
  communityId: string
): Promise<QuestionInfo[]> => {
  const res = await qmattaClient()
    .get(`question/${communityId}`)
    .then((res) => res.data)
    .catch((e) => console.log(e))

  // データが何も入っていない時に，とりあえずモックデータを出すようにしてる
  // デバッグができないので
  if (!res.questions) {
    // const res = getMockQuestionList()
    return res
  }
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
  return { question: res.question, answers: res.answers }
}

/**
 * 質問を投稿する：POST
 * @param data: Question
 * @returns questionId: string
 */
export const postQuestion = async (
  data: PostQuestion,
  communityId: string
): Promise<string> => {
  const res = await qmattaClient()
    .post(`question/${communityId}`, data)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res.questionId
}

/**
 * 質問に対して回答を投稿する: POST
 * @param questionId
 * @param data
 * @returns answerId
 */
export const postAnswer = async (
  questionId: string,
  data: Answer
): Promise<string> => {
  const res = await qmattaClient()
    .post(`question/answer/${questionId}`, data)
    .then((res) => res.data)
    .catch((e) => console.log(e))
  return res.answerId
}

/**
 * 質問投稿時に設定できる優先度を取得する
 * @returns priorities
 */
export const getPriorityList = async () => {
  const res = await qmattaClient()
    .get('question/priority')
    .then((res) => res.data)
    .catch((e) => console.log(e))

  if (!res.priorities) {
    const res = getMockPriorityList()
    return res
  }

  // console.log(res)
  return res.priorities
}

/**
 * 質問投稿時に設定できるステータスを取得する
 * @returns status
 */
export const getStatusList = async () => {
  const res = await qmattaClient()
    .get('question/status')
    .then((res) => res.data)
    .catch((e) => console.log(e))

  if (!res.statuses) {
    const res = getMockStatusList()
    return res
  }
  return res.statuses
}

export const getCategoryList = async () => {
  const mockCategoryList = getMockCategoryList()
  return mockCategoryList

  // APIが実装されたら
  const res = await qmattaClient()
    .get('question/category')
    .then((res) => res.data)
    .catch((e) => e.code)
  return res.category
}
