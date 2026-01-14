import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#6366f1', // Indigo primary
      light: '#818cf8',
      dark: '#4338ca',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899', // Pink secondary
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f3f4f6', // Light gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
    success: {
        main: '#10b981',
    },
    warning: {
        main: '#f59e0b',
    },
    info: {
        main: '#3b82f6',
    },
    error: {
        main: '#ef4444',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none', // More modern look
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        containedPrimary: {
           background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          border: '1px solid rgba(0,0,0,0.05)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                background: '#ffffff',
                color: '#1f2937',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            }
        }
    },
    MuiDialog: {
        styleOverrides: {
            paper: {
                borderRadius: 16,
            }
        }
    }
  },
});

export default responsiveFontSizes(theme);
