import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { MenuTabs } from '~/components/layouts/MenuTabs/Menutabs'

export type QuestionPagePresenterProps = {
  //
}

export const QuestionPagePresenter: React.FC<
  QuestionPagePresenterProps
> = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', mt: '96px' }}>
        <Box sx={{ flex: 1, p: '32px' }}>
          <MenuTabs />
        </Box>
        <Box sx={{ flex: 1, p: '32px' }}>
          <Typography>質問する</Typography>
          <Paper sx={{ height: '100%', p: '16px', position: 'relative' }}>
            <TextField fullWidth multiline sx={{ mb: '32px' }}></TextField>
            <Box
              sx={{
                bottom: '0px',
                left: '0px',
                p: '16px',
                position: 'absolute',
                width: '100%',
              }}
            >
              <Button variant='contained' fullWidth>
                質問を投稿する
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}
