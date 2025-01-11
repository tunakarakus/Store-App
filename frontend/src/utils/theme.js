import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#B71C1C',
            light: '#D32F2F',
            dark: '#7F0000',
            contrastText: '#fff',
        },
        secondary: {
            main: '#C62828',
            light: '#FF5F52',
            dark: '#8E0000',
            contrastText: '#fff',
        },
        background: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
            banner: '#B71C1C',
        },
        text: {
            primary: '#1A1A1A',
            secondary: '#666666',
            banner: '#FFFFFF',
        },
        error: {
            main: '#FF1744',
        },
        success: {
            main: '#B71C1C',
        },
        warning: {
            main: '#FF9100',
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
                        boxShadow: '0 4px 12px rgba(183, 28, 28, 0.1)',
                        color: 'inherit'
                    },
                },
                contained: {
                    boxShadow: '0 2px 8px rgba(183, 28, 28, 0.1)',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(183, 28, 28, 0.15)',
                        backgroundColor: '#C62828',
                        color: '#fff'
                    },
                },
                outlined: {
                    borderColor: '#B71C1C',
                    '&:hover': {
                        backgroundColor: 'rgba(183, 28, 28, 0.02)',
                        borderColor: '#B71C1C',
                        color: 'inherit'
                    },
                },
                text: {
                    '&:hover': {
                        backgroundColor: 'rgba(183, 28, 28, 0.02)',
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
                    '&:hover': {
                        backgroundColor: 'rgba(183, 28, 28, 0.04)',
                        color: '#B71C1C',
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#B71C1C',
                    textDecoration: 'none',
                    '&:hover': {
                        color: 'inherit',
                        textDecoration: 'none',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#1A1A1A',
                    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                        boxShadow: '0 4px 20px 0 rgba(183, 28, 28, 0.15)',
                        transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&.Mui-focused fieldset': {
                            borderColor: '#B71C1C',
                        },
                        '&:hover fieldset': {
                            borderColor: '#D32F2F',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
                filled: {
                    backgroundColor: '#FFEBEE',
                    color: '#B71C1C',
                    '&:hover': {
                        backgroundColor: '#FFCDD2',
                    },
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: '#B71C1C',
                    color: '#fff',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(183, 28, 28, 0.04)',
                    },
                },
            },
        },
    },
});

export default theme; 