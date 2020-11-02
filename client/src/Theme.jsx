import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { funk } from '@theme-ui/presets'
// import theme from '@theme-ui/preset-base'
import DDinWoff from './assets/fonts/D-DIN.woff';
import DDinBoldWoff from './assets/fonts/D-DIN-Bold.woff';

const dDin = {
    fontFamily: 'D-DIN',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
    local('D-DIN'),
    local('D-DIN-Regular'),
    url(${DDinWoff}) format('woff')
  `,
};

const dDinBold = {
    fontFamily: 'D-DIN',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 700,
    src: `
    local('D-DIN'),
    local('D-DIN-Bold'),
    url(${DDinBoldWoff}) format('woff')
  `,
};

const fonts = [
    'D-DIN',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fire Sans',
    'Droid Sans',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
].join(',')

// example theme.js
const funkTheme = {
    ...funk,
    styles: {
        ...funk.styles,
    },
    typography: {
        fontFamily: fonts,
    },
    fonts: {
        body: 'D-DIN',
        heading: 'D-DIN'
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [dDin,dDinBold],
            },
        },
    },
    forms: {
        input: {
            border: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, .4)',
            borderRadius: '0px',
            marginLeft: '1em',
            outline: 'none',
            maxWidth: '40%',
            padding: '0 0 0 0',
            fontFamily: fonts
        }
    }
}

// const themeObj = {
//     ...theme, 
//     styles: {
//         ...theme,
//     }
// }

export default props => (
    <ThemeProvider theme={funkTheme}>{props.children}</ThemeProvider>
)