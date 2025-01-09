import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF0000', // Pure red
            light: '#FF3333', // Lighter red
            dark: '#CC0000', // Darker red
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#000000', // Black
            light: '#333333', // Light black/dark gray
            dark: '#000000', // Pure black
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#FF0000', // Using red instead of green for success
            light: '#FF3333',
            dark: '#CC0000',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#000000',
            secondary: '#666666',
        },
        divider: '#DDDDDD',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 4,
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#CC0000',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#FF0000',
                    '&:hover': {
                        borderColor: '#CC0000',
                        backgroundColor: 'rgba(255, 0, 0, 0.04)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid #DDDDDD',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    backgroundColor: '#FF0000',
                    color: '#FFFFFF',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.04)',
                    },
                },
            },
        },
    },
    typography: {
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
});

export default theme; 