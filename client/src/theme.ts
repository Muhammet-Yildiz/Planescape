import { Divider, List, ListItemText } from '@mui/material';
import {
    alpha,
    createTheme as createMuiTheme,
    responsiveFontSizes
  } from '@mui/material/styles';
  
  const baseThemeOptions = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            letterSpacing: '0.02rem',
            '&:hover': {
              backgroundColor: '#4b019b' 
            },
          },
          sizeLarge: {
            fontSize: 15
          },
          sizeMedium: {
            fontSize: 13
          },
          sizeSmall: {
            fontSize: 12
          }
        }
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true
        }
      },
      
      MuiListItem: {
        styleOverrides: {
          root: {
            padding: 14
          }
        }
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            margin: 0
          },
          primary: {
            color : '#03060b',
            fontSize: '0.85rem'
          },
          secondary: {
            color : '#a3a2a2',
            fontSize: '0.7rem'
          },
        
        }
      },
      
    },
    
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: {
        fontSize: 48,
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h2: {
        fontSize: 36,
        fontWeight: 600,
        lineHeight: 1.5
      },
      h3: {
        fontSize: 32,
        fontWeight: 600,
        lineHeight: 1.5
      },
      h4: {
        fontSize: 24,
        fontWeight: 600,
        lineHeight: 1.5
      },
      h5: {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.5
      },
      h6: {
        fontSize: 16,
        fontWeight: 600,
        lineHeight: 1.5
      },
      body1: {},
      body2: {
        lineHeight: 1.6
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 1.75
      },
      subtitle2: {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 1.75
      },
      caption: {
        fontWeight: 400,
        lineHeight: 1.6
      },
      overline: {
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 1,
        lineHeight: 2.46
      },
      button: {
        fontWeight: 500,
        textTransform: 'none'
      }
    }
  }  as const;
  
  const lightThemeOptions = {
    components: {},
    palette: {
      background: {
        default: '#ffffff',
        paper: '#F6F4F8'
      },
      mode: 'light',
      primary: {
        main: '#4b019b'
      },
      text: {
        disabled: '#E4EAF3',
        primary: '#2e2e2e',
        secondary: '#595858',
        main : '#4b019b',
        grey : '#636363'
      },
    },
  
  }  as const;
  
  const darkThemeOptions = {} 
  
  export const createCustomTheme = (config:  { theme: 'light' | 'dark' } = { theme: 'light' }) => {
    let themeOptions = config.theme === 'light'
      ? lightThemeOptions
      : darkThemeOptions;
  
    if (!themeOptions) {
      themeOptions = lightThemeOptions;
    }
  
    const theme = responsiveFontSizes(createMuiTheme({ ...baseThemeOptions }, { ...themeOptions }))
  
    return theme;
  };