import { MenuTabs } from '~/components/layouts/MenuTabs/Menutabs'

import { Box, Button, TextField, Typography } from '@mui/material'

export type CommunityPagePresenterProps = {
  communityId: string
}

export const CommunityPagePresenter: React.FC<
  CommunityPagePresenterProps
> = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
        mt: '96px',
        p: '24px',
      }}
    >
      <Box sx={{ height: '100%' }}>
        <MenuTabs />
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Typography sx={{ mb: '12px' }} variant='h5'>
          質問する
        </Typography>
        <Box
          sx={[
            { p: '16px' },
            {
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '1px 1px 4px #dddddd',
            },
          ]}
        >
          <Typography sx={{ mb: '12px' }} variant='subtitle1'>
            質問タイトル
          </Typography>
          <TextField
            placeholder='Leave a title'
            sx={[{ mb: '16px' }, { ckgroundColor: '#eeeeee' }]}
            fullWidth
          />
          <Typography sx={{ mb: '16px' }} variant='subtitle1'>
            質問内容
          </Typography>
          <TextField
            placeholder='Leave a comment'
            rows={8}
            sx={[
              {
                maxHeight: '400px',
                mb: '32px',
                minHeight: '200px',
                overflow: 'scroll',
              },
              { ckgroundColor: '#eeeeee' },
            ]}
            fullWidth
            multiline
          />
          <Button variant='contained' fullWidth>
            質問を投稿する
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
