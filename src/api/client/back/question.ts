import qmattaClient from '..'

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
    return res
  }
  return res.questions
}

/**
 * 質問の詳細を取得する：GET
 * @param questionId string
 */
type GetQuestionHistoryType = {
  error: boolean
  errorMessage?: string
  questionHistory?: QuestionHistory
}
export const getQuestionHistory = async (
  questionId: string
): Promise<GetQuestionHistoryType> => {
  const res = await qmattaClient()
    .get(`question/answer/${questionId}`)
    .then((res) => res.data)
    .catch((e) => {
      const returnVal = {
        error: true,
        errorMessage: e.code,
      }
      return returnVal
    })
  const returnVal = {
    error: false,
    questionHistory: res,
  }
  return returnVal
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

  const returnVal = {
    error: false,
    priorities: res.priorities.map(
      (priority: { priorityId: string; priorityName: string }) => {
        const data = {
          label: priority.priorityName,
          priorityId: priority.priorityId,
        }
        return data
      }
    ),
  }

  return returnVal
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

  const returnVal = {
    error: false,
    statuses: res.statuses.map(
      (status: { statusId: string; statusName: string }) => {
        const data = {
          label: status.statusName,
          statusId: status.statusId,
        }
        return data
      }
    ),
  }
  return returnVal
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
