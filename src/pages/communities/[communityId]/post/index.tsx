import { getCommunityLayout } from '~/components/layouts/base'
import { QuestionPostPage } from '~/components/pages/questionPost'
import { NextPageWithLayout } from '~/types/next'

const QuestionPost: NextPageWithLayout = () => {
  return (
    <>
      <QuestionPostPage />
    </>
  )
}

QuestionPost.getLayout = getCommunityLayout

export default QuestionPost
