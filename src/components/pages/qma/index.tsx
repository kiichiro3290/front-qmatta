import { useFetchQmaMessage } from '~/pages/api/fetch'
import { QmaPagePresenter } from './presenter'

export type QmaPageProps = {
  // TODO
}

export const QmaPage: React.FC<QmaPageProps> = () => {
  const { data, error } = useFetchQmaMessage()

  return <QmaPagePresenter qmaMessage={data} />
}
