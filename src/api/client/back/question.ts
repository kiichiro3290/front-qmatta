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
 * @returns { quesitons: QuestionInfo[] }
 */
type GetQuestionListType = {
  error: boolean
  errorMessage?: string
  questions?: QuestionInfo[]
}
export const getQuestionList = async (
  communityId: string
): Promise<GetQuestionListType> => {
  const res = await qmattaClient()
    .get(`question/${communityId}`)
    .then((res) => {
      const returnVal = {
        error: false,
        questions: res.data.questions,
      }
      return returnVal
    })
    .catch((e) => {
      const res = {
        error: true,
        errorMessage: e.code,
      }
      return res
    })
  return res
}

/**
 * 質問の詳細を取得する：GET
 * @param questionId
 * @return { getQuestionHistory: GetQuestionHistoryType }
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
    .then((res) => {
      const returnVal = {
        error: false,
        getQuestionHistory: res.data.questionHistory,
      }
      return returnVal
    })
    .catch((e) => {
      const returnVal = {
        error: true,
        errorMessage: e.code,
      }
      return returnVal
    })

  return res
}

/**
 * 質問を投稿する：POST
 * @param data: Question
 * @returns { questionId: string }
 */
type PostQuestionType = {
  error: boolean
  errorMessage?: string
  questionId?: string
}
export const postQuestion = async (
  data: PostQuestion,
  communityId: string
): Promise<PostQuestionType> => {
  const res = await qmattaClient()
    .post(`question/${communityId}`, data)
    .then((res) => {
      const returnVal = {
        error: false,
        questionId: res.data.questionId,
      }
      return returnVal
    })
    .catch((e) => {
      const res = {
        error: true,
        errorMessage: e.code,
      }
      return res
    })
  return res
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
type GetPriorityListType = {
  error: boolean
  errorMessage?: string
  priorityList?: Priority[]
}
export const getPriorityList = async (): Promise<GetPriorityListType> => {
  const res = await qmattaClient()
    .get('question/priority')
    .then((res) => {
      const returnVal = {
        error: false,
        priorities: res.data.priorities.map(
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
    })
    .catch((e) => {
      const res = {
        error: true,
        errorMessage: e.code,
      }
      return res
    })

  return res
}

/**
 * 質問投稿時に設定できるステータスを取得する
 * @returns status
 */
type GetStatusListType = {
  error: boolean
  errorMessage?: string
  statusList?: QuestionStatus[]
}
export const getStatusList = async (): Promise<GetStatusListType> => {
  const res = await qmattaClient()
    .get('question/status')
    .then((res) => {
      const returnVal = {
        error: false,
        statuses: res.data.statuses.map(
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
    })
    .catch((e) => {
      const res = {
        error: true,
        errorMessage: e.code,
      }
      return res
    })

  return res
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
