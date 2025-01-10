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
                            STORE
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Your trusted source for network infrastructure solutions.
                            Quality products and expert support for all your networking needs.
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <IconButton color="primary" aria-label="facebook">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="twitter">
                                <TwitterIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="instagram">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="linkedin">
                                <LinkedInIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link component={RouterLink} to="/products" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Products
                        </Link>
                        <Link component={RouterLink} to="/about" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            About Us
                        </Link>
                        <Link component={RouterLink} to="/contact" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Contact
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

                    {/* Contact Info and Currency Selector */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                123 Business Street, City, 12345
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                +1 (555) 123-4567
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                info@store.com
                            </Typography>
                        </Box>
                        <FormControl fullWidth size="small">
                            <InputLabel>Currency</InputLabel>
                            <Select
                                value={selectedCurrency}
                                onChange={handleCurrencyChange}
                                label="Currency"
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

                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} STORE. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer; 