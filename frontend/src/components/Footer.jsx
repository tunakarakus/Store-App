import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
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

const Footer = () => {
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

                    {/* Contact Info */}
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                info@store.com
                            </Typography>
                        </Box>
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