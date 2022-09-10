import { useRouter } from 'next/router'
import { WorkSpacePagePresenter } from './presenter'

export type WorkSpacePageProps = {
  //
}

export const WorkSpacePage: React.FC<WorkSpacePageProps> = () => {
  const router = useRouter()
  const { id } = router.query
  return <WorkSpacePagePresenter workspaceId={id} />
}
