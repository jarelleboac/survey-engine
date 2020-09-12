import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { funk } from '@theme-ui/presets'
import theme from '@theme-ui/preset-base'

// // example theme.js
// const funkTheme = {
//     ...funk,
//     styles: {
//         ...funk.styles,
//     },
// }

const themeObj = {
    ...theme, 
    styles: {
        ...theme,
    }
}

export default props => (
    <ThemeProvider theme={themeObj}>{props.children}</ThemeProvider>
)