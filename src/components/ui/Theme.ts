import { createTheme } from '@mui/material';

export const defaultTheme = createTheme({});

export const retro70sTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5d6d37', // Avocado Green
      contrastText: '#fdf6e3'
    },
    secondary: {
      main: '#e58e26' // Burnt Orange
    },
    warning: {
      main: '#f1b434' // Harvest Gold
    },
    background: {
      default: '#f4ece1', // Cream/Warm Paper
      paper: '#fdf6e3'
    },
    text: {
      primary: '#3d2b1f', // Deep Earthy Brown
      secondary: '#5d4037'
    }
  },
  typography: {
    // Using serif for that vintage magazine/print look
    fontFamily: '"Georgia", "Times New Roman", serif',
    h1: { fontWeight: 700, letterSpacing: '-1px', color: '#3d2b1f' },
    h4: { fontWeight: 700, color: '#e58e26' },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem'
    }
  },
  shape: {
    borderRadius: 24 // Very rounded, "Space Age" plastic look
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 24px',
          boxShadow: 'none',
          border: '3px solid transparent',
          '&:hover': {
            boxShadow: '0px 4px 0px #3d2b1f',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.2s ease-in-out'
        },
        containedPrimary: {
          backgroundColor: '#5d6d37'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '4px solid #3d2b1f',
          boxShadow: '8px 8px 0px #f1b434'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#3d2b1f', // Dark wood/ebonized finish
          borderBottom: '4px solid #e58e26'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            '& fieldset': {
              borderColor: '#3d2b1f',
              borderWidth: '2px'
            }
          }
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#e58e26',
          border: '2px solid #3d2b1f'
        },
        track: {
          height: 8
        },
        rail: {
          height: 8,
          opacity: 1,
          backgroundColor: '#d7ccc8'
        }
      }
    }
  }
});

/**
 * LIGHT PASTEL THEME: "Cloud Nine"
 * Focus: High brightness, low saturation, playful but clean geometry.
 */
export const pastelTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F7F9FC', // Very light cool grey/blue
      paper: '#FFFFFF'
    },
    primary: {
      main: '#B8C0FF', // Soft Periwinkle
      contrastText: '#4A4E69'
    },
    secondary: {
      main: '#C8E7FF' // Light Sky
    },
    success: {
      main: '#B9FBC0' // Mint Green
    },
    warning: {
      main: '#FFCFD2' // Soft Peach
    },
    text: {
      primary: '#4A4E69', // Muted Navy (softer than black)
      secondary: '#9A8C98' // Muted Rose-Grey
    }
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: { fontWeight: 800, color: '#4A4E69' },
    h4: { fontWeight: 700, color: '#4A4E69' },
    subtitle1: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  shape: {
    borderRadius: 24 // Extra rounded for a "friendly" feel
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 10px 20px -5px rgba(184, 192, 255, 0.4)',
            transform: 'translateY(-2px)'
          }
        },
        contained: {
          backgroundColor: '#B8C0FF',
          '&:hover': {
            backgroundColor: '#A0ABFF'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: 'none',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.03)'
        }
      }
    }
  }
});

// Refined Pastel Theme
export const refinedPastelTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F7F9FC',
      paper: '#FFFFFF'
    },
    primary: {
      main: '#B8C0FF',
      contrastText: '#4A4E69'
    },
    secondary: {
      main: '#C8E7FF'
    },
    success: {
      main: '#B9FBC0'
    },
    warning: {
      main: '#FFD6A5'
    },
    error: {
      main: '#FFCFD2'
    },
    text: {
      primary: '#4A4E69',
      secondary: '#9A8C98'
    },
    action: {
      disabledBackground: '#E8EBF0',
      disabled: '#B0B8C4'
    }
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: { fontWeight: 800, color: '#4A4E69' },
    h5: { fontWeight: 800 },
    subtitle1: { fontWeight: 600, color: '#4A4E69' },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  shape: {
    borderRadius: 20
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px -4px rgba(184, 192, 255, 0.3)',
            transform: 'translateY(-1px)'
          }
        },
        contained: {
          '&.Mui-disabled': {
            backgroundColor: '#E8EBF0',
            color: '#B0B8C4'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.2s ease-in-out',
            '& fieldset': {
              borderColor: 'transparent',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
            },
            '&:hover fieldset': {
              borderColor: '#B8C0FF'
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
              borderColor: '#B8C0FF'
            }
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }
      }
    }
  }
});
