import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { funk } from '@theme-ui/presets'
// import theme from '@theme-ui/preset-base'

// example theme.js
const funkTheme = {
    ...funk,
    styles: {
        ...funk.styles,
    },
    forms: {	
        noBorder: {	
            border: 'none',	
            borderBottom: '1px solid rgba(0, 0, 0, .4)',	
            borderRadius: '0px',	
            marginLeft: '1em',	
            outline: 'none',	
            maxWidth: '40%',	
            padding: '0 0 0 0',
            fontFamily: 'D-DIN, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
        }	
    },
    colors: {
        text: '#000',
        background: '#fff',
        primary: '#648',
    },
    fonts: {
        body: 'D-DIN, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
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