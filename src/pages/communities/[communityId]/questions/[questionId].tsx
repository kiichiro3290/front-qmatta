import { getCommunityLayout } from '~/components/layouts/base'
import { QuestionPage } from '~/components/pages/question'
import { NextPageWithLayout } from '~/types/next'

const Question: NextPageWithLayout = () => {
  return (
    <>
      <QuestionPage />
    </>
  )
}

Question.getLayout = getCommunityLayout

export default Question
