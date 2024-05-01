/*
xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px

xs={10} sm={8} md={6} lg={4} xl={2}

VERDE

HEX
#0FB1AD

RGB
15 | 177 |173

LARANJA

HEX
#DC7B3F

RGB
220 | 456 | 63

CINZA CLARO

HEX
#F4F4F5

RGB
244 | 244 | 245

*/

import { createTheme } from "@mui/material"
import { ptBR } from "@mui/material/locale"

export const THEME = createTheme(
  {
    typography: {
      fontFamily: ["Roboto", "Open Sans"].join(","),
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          regular: {
            height: "12px",
            // width: "20px",
            minHeight: "32px",
            "@media (min-width: 600px)": {
              minHeight: "48px",
            },
            // backgroundColor: ,
            // color: "red",
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          color: "secondary",
          style: { height: "35px", width: "35px" },
        },
      },
      MuiButton: {
        defaultProps: {
          color: "primary",
        },
      },
    },
    /*
    */

    /*
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          boxSizing: 'content-box',
          padding: 5,
          fontSize: '1.125rem',
        },
      },
    },
  },
  */
    cores: {
      cinzaFundo: "#F4F4F5",
      cinzaTexto: "#A0A0A0",
    },
    inputs: {
      marginTop: 2,
    },
    menu: {
      corIcone: "#A569BD",
    },
    mensagens: {
      /*
    corWarning: '#A569BD',
    corError: '#A569BD',
    corInfo: '#A569BD',
    corSuccess: '#A569BD',
    corFundo: '#A569BD',
    corTitulo: '#A569BD',
    corMensagem: '#A569BD',
    tamanhoIcone: 50
    */
      corWarning: "#DC7B3F",
      corError: "#e74c3c",
      corInfo: "#0FB1AD",
      corSuccess: "#28a745",
      corFundo: "#A569BD",
      corTitulo: "#0FB1AD",
      corMensagem: "#DC7B3F",
      tamanhoIcone: 50,
    },
    palette: {
      primary: {
        main: "#DC7B3F",
      },
      secondary: {
        main: "#0FB1AD",
      },
      action: {
        disabledBackground: "#A569BD",
        disabled: "#A569BD",
      },
    },
  },
  ptBR
)

declare module "@mui/material/styles" {
  interface Theme {
    cores: {
      cinzaFundo: string
      cinzaTexto: string
    }
    menu: {
      corIcone: string
    }
    inputs: {
      marginTop: number
    }
    mensagens: {
      corWarning: string
      corError: string
      corInfo: string
      corSuccess: string
      corFundo: string
      corTitulo: string
      corMensagem: string
      tamanhoIcone: number
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    cores: {
      cinzaFundo: string
      cinzaTexto: string
    }

    inputs: {
      marginTop: number
    }
    menu: {
      corIcone: string
    }
    mensagens: {
      corWarning: string
      corError: string
      corInfo: string
      corSuccess: string
      corFundo: string
      corTitulo: string
      corMensagem: string
      tamanhoIcone: number
    }
  }
}
