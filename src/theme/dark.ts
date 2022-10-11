import { createTheme } from '@mui/material/styles'

import { baseTheme } from './base'

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    background: {
      default: '#22272D',
      paper: '#2D333A',
    },
    mode: 'dark',
    primary: {
      contrastText: '#FFFFFF',
      main: '#F2A516',
    },
    secondary: {
      contrastText: '#FFFFFF',
      main: '#C64F4F',
    },
  },
})
