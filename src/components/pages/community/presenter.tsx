import { Box, Button, TextField, Typography } from '@mui/material'
import { HeaderLayout } from '~/components/layouts/HeaderLayout/HeaderLayout'
import { MenuTabs } from '~/components/layouts/MenuTabs/Menutabs'

export type CommunityPagePresenterProps = {
  communityId: string
}

export const CommunityPagePresenter: React.FC<CommunityPagePresenterProps> = () => {
  return (
    <Box>
      <HeaderLayout communityList={[]} />
      <Box
        sx={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr', height: '100vh', mt: '96px', p: '24px' }}
      >
        <Box sx={{ height: '100%' }}>
          <MenuTabs />
        </Box>
        <Box sx={{ height: '100%', width: '100%' }}>
          <Typography variant='h5' sx={{ mb: '12px' }}>
            質問する
          </Typography>
          <Box
            sx={[{ p: '16px' }, { backgroundColor: 'white', borderRadius: '6px', boxShadow: '1px 1px 4px #dddddd' }]}
          >
            <Typography variant='subtitle1' sx={{ mb: '12px' }}>
              質問タイトル
            </Typography>
            <TextField fullWidth placeholder='Leave a title' sx={[{ mb: '16px' }, { ckgroundColor: '#eeeeee' }]} />
            <Typography variant='subtitle1' sx={{ mb: '16px' }}>
              質問内容
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder='Leave a comment'
              sx={[
                { maxHeight: '400px', mb: '32px', minHeight: '200px', overflow: 'scroll' },
                { ckgroundColor: '#eeeeee' },
              ]}
            />
            <Button variant='contained' fullWidth>
              質問を投稿する
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
