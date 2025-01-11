import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
} from '@mui/icons-material';
import { setCurrency } from '../features/currencySlice';
import { fetchExchangeRates } from '../features/currencySlice';

const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
];

const Footer = () => {
    const dispatch = useDispatch();
    const { selectedCurrency, exchangeRates } = useSelector((state) => state.currency);

    useEffect(() => {
        // Fetch exchange rates when component mounts
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    const handleCurrencyChange = (event) => {
        dispatch(setCurrency(event.target.value));
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.paper',
                py: 6,
                mt: 'auto',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Company Info */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            BC FIBER
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your trusted source for network infrastructure solutions.
                            Quality products and expert support for all your networking needs.
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <IconButton 
                                color="inherit" 
                                aria-label="facebook" 
                                sx={{ 
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton 
                                color="inherit" 
                                aria-label="twitter" 
                                sx={{ 
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                <TwitterIcon />
                            </IconButton>
                            <IconButton 
                                color="inherit" 
                                aria-label="instagram" 
                                sx={{ 
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                <InstagramIcon />
                            </IconButton>
                            <IconButton 
                                color="inherit" 
                                aria-label="linkedin" 
                                sx={{ 
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Legal Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Legal & Policies
                        </Typography>
                        <Link component={RouterLink} to="/institutional" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Institutional Clarification Text
                        </Link>
                        <Link component={RouterLink} to="/contact-form" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Contact Form Clarification Text
                        </Link>
                        <Link component={RouterLink} to="/camera-disclosure" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Camera Disclosure Text
                        </Link>
                        <Link component={RouterLink} to="/employee-disclosure" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Employee Candidate Disclosure Text
                        </Link>
                        <Link component={RouterLink} to="/cookie-policy" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Cookie Policy
                        </Link>
                    </Grid>

                    {/* Products */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Products
                        </Typography>
                        <Link component={RouterLink} to="/products?category=Fiber%20Optic%20Products" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Fiber Optic Products
                        </Link>
                        <Link component={RouterLink} to="/products?category=Copper%20Products" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Copper Products
                        </Link>
                        <Link component={RouterLink} to="/products?category=FTTH%2FGPON%20Products" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            FTTH/GPON Products
                        </Link>
                    </Grid>

                    {/* Email Subscription and Currency Selector */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Subscribe to our newsletter to receive updates and special offers.
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                mb: 3
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    backgroundColor: '#fff',
                                    color: '#000'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#c41e3a',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Subscribe
                            </button>
                        </Box>
                        <FormControl fullWidth size="small">
                            <InputLabel sx={{ color: 'text.secondary', '&.Mui-focused': { color: 'text.secondary' } }}>Currency</InputLabel>
                            <Select
                                value={selectedCurrency}
                                onChange={handleCurrencyChange}
                                label="Currency"
                                sx={{
                                    color: 'text.primary',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.23)',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.87)',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.87)',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: 'rgba(0, 0, 0, 0.54)',
                                    },
                                    '&.Mui-focused': {
                                        color: 'text.primary',
                                    }
                                }}
                                MenuProps={{
                                    sx: {
                                        '& .MuiMenuItem-root': {
                                            color: 'text.primary',
                                            '&.Mui-selected': {
                                                color: 'text.primary',
                                                backgroundColor: 'action.hover',
                                            },
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                        }
                                    }
                                }}
                            >
                                {currencies.map((currency) => (
                                    <MenuItem key={currency.code} value={currency.code}>
                                        {currency.code} ({currency.symbol}) - {currency.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 6, mb: 4 }} />

                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                        © {new Date().getFullYear()} BC FIBER. All rights reserved.
                    </Typography>
                    <Box 
                        component="span" 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                            '& > a': {
                                color: 'text.secondary',
                                textDecoration: 'none',
                                fontSize: 'inherit',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            }
                        }}
                    >
                        <Link component={RouterLink} to="/site-map">Site Map</Link>
                        <Box component="span" sx={{ mx: 1, fontSize: 'inherit' }}>|</Box>
                        <Link component={RouterLink} to="/accessibility">Accessibility</Link>
                        <Box component="span" sx={{ mx: 1, fontSize: 'inherit' }}>|</Box>
                        <Link component={RouterLink} to="/privacy">Privacy and Cookies</Link>
                        <Box component="span" sx={{ mx: 1, fontSize: 'inherit' }}>|</Box>
                        <Link component={RouterLink} to="/terms">Terms and Conditions</Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer; 