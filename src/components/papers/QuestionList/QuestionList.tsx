import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

type QuestionListProps = {
  questions: Question[]
}

type StatusChipProps = {
  statusType: StatusType
}
const StatusChip: React.FC<StatusChipProps> = ({ statusType }) => {
  return <Chip label={statusType} />
}

type PriorityChipProps = {
  priorityType: PriorityType
}
const PriorityChip: React.FC<PriorityChipProps> = ({ priorityType }) => {
  return <Chip label={priorityType} />
}

export const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>質問タイトル</TableCell>
            <TableCell align='right'>日付</TableCell>
            <TableCell align='right'>ラベル</TableCell>
            <TableCell align='right'>優先度</TableCell>
            <TableCell align='right'>ステータス</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {questions.map((question, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {question.title}
              </TableCell>
              <TableCell align='right'>
                {question.createdAt.toLocaleString()}
              </TableCell>
              <TableCell align='right'>{question.label[0]}</TableCell>
              <TableCell align='right'>
                <PriorityChip priorityType={question.priority} />
              </TableCell>
              <TableCell align='right'>
                <StatusChip statusType={question.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
