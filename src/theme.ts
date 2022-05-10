import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        alette: {
            primary: {
              main: string,
              contrastText: string,
            },
            secondary: {
              main: string,
              contrastText: string,
            },
            background: {
              default: string,
              paper: string,
            },
            text: {
              primary: string,
              secondary: string,
            },
          },
    }
    // allow configuration using `createTheme`
//     interface ThemeOptions {
//         palette?: {
//             primary?: {
//                 main?: string,
//             },
//             secondary?: {
//                 main?: string
//             },
//         },
//     }
  }

  export const theme = createTheme({
    palette: {
        primary: {
          main: '#9d6a89',
          contrastText: '#dcead9',
        },
        secondary: {
          main: '#ee92c2',
          contrastText: '#725d68',
        },
        background: {
          default: '#e4b392',
          paper: '#f5d8c5',
        },
        text: {
          primary: '#604e58',
          secondary: '#DCEAD9',
        },
      },
  });