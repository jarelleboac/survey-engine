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
        }	
    },
    colors: {
        text: '#000',
        background: '#fff',
        primary: '#648',
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