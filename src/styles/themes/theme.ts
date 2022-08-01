import { createTheme } from '@mui/material/styles'

export const defaultTheme = createTheme({
  palette: {
    primary: {
      light: '#3581FF',
      main: '#3C44FF',
      dark: '#2329A7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#FF7570',
      main: '#FF5C57',
      dark: '#B32F2B',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7FAFF',
    },
    text: {
      primary: '#555555',
      secondary: '#696969',
    },
  },
})
