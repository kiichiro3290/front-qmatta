import { createTheme } from '@mui/material/styles'

export const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#F7FAFF',
    },
    grey: { 100: '#e5e5e5' },
    icon: {
      blue: '#304ffe',
      pink: '#FF5C57',
    },
    primary: {
      contrastText: '#222222',
      dark: '#FFDF99',
      light: '#FFDF99',
      main: '#FFAF03',
    },
    secondary: {
      contrastText: '#5e5e5e',
      dark: '#1CE4FF',
      light: '#FF7570',
      main: '#B2F6FF',
    },
    text: {
      primary: '#555555',
      secondary: '#696969',
    },
  },
})
