import { createTheme } from '@mui/material/styles'

export const defaultTheme = createTheme({
  palette: {
    background: {
      default: '#F7FAFF',
    },
    primary: {
      contrastText: '#FFFFFF',
      dark: '#2329A7',
      light: '#3581FF',
      main: '#3C44FF',
    },
    secondary: {
      contrastText: '#FFFFFF',
      dark: '#B32F2B',
      light: '#FF7570',
      main: '#FF5C57',
    },
    text: {
      primary: '#555555',
      secondary: '#696969',
    },
  },
})
