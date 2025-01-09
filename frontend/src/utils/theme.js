import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2D3436',
            light: '#636E72',
            dark: '#1E272E',
            contrastText: '#fff',
        },
        secondary: {
            main: '#00B894',
            light: '#55EFC4',
            dark: '#00A885',
            contrastText: '#fff',
        },
        background: {
            default: '#F5F6FA',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2D3436',
            secondary: '#636E72',
        },
        error: {
            main: '#FF7675',
        },
        success: {
            main: '#00B894',
        },
        warning: {
            main: '#FDCB6E',
        },
    },
    typography: {
        fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
        h1: {
            fontWeight: 600,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        color: 'inherit'
                    },
                    '&.nav-link': {
                        '&:hover': {
                            transform: 'none',
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                            color: 'inherit'
                        }
                    }
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        backgroundColor: '#1E272E',
                        color: '#fff'
                    },
                },
                outlined: {
                    '&:hover': {
                        backgroundColor: 'rgba(45, 52, 54, 0.04)',
                        color: 'inherit'
                    },
                },
                text: {
                    '&:hover': {
                        backgroundColor: 'rgba(45, 52, 54, 0.04)',
                        color: 'inherit'
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: 8,
                    transition: 'all 0.2s ease-in-out',
                    '&:not(.cart-icon):hover': {
                        transform: 'translateY(-1px)',
                        backgroundColor: 'rgba(45, 52, 54, 0.04)',
                    },
                    '&.cart-icon:hover': {
                        color: 'inherit'
                    },
                    '&[color="error"]': {
                        '&:hover': {
                            backgroundColor: 'rgba(255, 118, 117, 0.04)',
                        }
                    }
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        color: 'inherit'
                    }
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#2D3436',
                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.store-logo': {
                        '&:hover': {
                            color: 'inherit'
                        }
                    }
                }
            }
        },
    },
});

export default theme; 