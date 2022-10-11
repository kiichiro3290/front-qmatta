import { createTheme } from '@mui/material/styles'

import { baseTheme } from './base'

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    background: {
      default: '#F7FAFF',
      paper: '#FFFFFF',
    },
    icon: {
      blue: '#304ffe',
      pink: '#FF5C57',
    },
    mode: 'light',
    primary: {
      contrastText: '#222222',
      main: '#FFAF03',
    },
    secondary: {
      contrastText: '#5e5e5e',
      main: '#B2F6FF',
    },
    text: {
      primary: '#555555',
      secondary: '#696969',
    },
  },
})
