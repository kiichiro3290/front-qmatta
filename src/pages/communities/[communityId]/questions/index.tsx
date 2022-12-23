import { getCommunityLayout } from '~/components/layouts/base'
import { QuestionListPage } from '~/components/pages/questionList'
import { NextPageWithLayout } from '~/types/next'

const QuestionList: NextPageWithLayout = () => {
  return (
    <>
      <QuestionListPage />
    </>
  )
}

QuestionList.getLayout = getCommunityLayout

export default QuestionList
