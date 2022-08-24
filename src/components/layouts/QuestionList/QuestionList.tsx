import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

type Props = {
  // TODO
}

function createData(name: string, datetime: string, priority: string, carbs: number, status: string) {
  const statusChip = <StatusChip statusType={status} />
  const priorityChip = <PriorityChip priorityType={priority} />
  return { carbs, datetime, name, priorityChip, statusChip }
}

type StatusChipProps = {
  statusType: string
}
const StatusChip: React.FC<StatusChipProps> = ({ statusType }) => {
  return <Chip label={statusType} />
}
type PriorityChipProps = {
  priorityType: string
}
const PriorityChip: React.FC<PriorityChipProps> = ({ priorityType }) => {
  return <Chip label={priorityType} />
}
const rows = [
  createData('Frozen yoghurt', Date(), 'なるはや', 24, '解決'),
  createData('Ice cream sandwich', Date(), 'まったり', 37, 'ピンチ'),
  createData('Eclair', Date(), '緊急', 24, 'クマった'),
  createData('Cupcake', Date(), '焦らず', 67, '沼った'),
  createData('Gingerbread', Date(), 'いつでも', 49, '回答募集中'),
]
export const QuestionList: React.FC<Props> = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>質問タイトル</TableCell>
            <TableCell align='right'>日付</TableCell>
            <TableCell align='right'>ステータス</TableCell>
            <TableCell align='right'>ラベル</TableCell>
            <TableCell align='right'>優先度</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.datetime}</TableCell>
              <TableCell align='right'>{row.priorityChip}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.statusChip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
