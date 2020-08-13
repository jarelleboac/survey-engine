import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { funk } from '@theme-ui/presets'


// example theme.js
const theme = {
    ...funk,
    styles: {
        ...funk.styles,
    },
}

export default props => (
    <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
)