import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
} from '@mui/material';
import {
    LocalShipping as ShippingIcon,
    Security as SecurityIcon,
    Support as SupportIcon,
    VerifiedUser as QualityIcon,
    Cable as CableIcon,
    Router as RouterIcon,
    Wifi as WifiIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const features = [
    {
        icon: QualityIcon,
        title: 'Premium Quality Products',
        description: 'All our products are sourced from certified manufacturers and undergo rigorous quality testing.',
    },
    {
        icon: ShippingIcon,
        title: 'Fast & Reliable Shipping',
        description: 'Quick delivery nationwide with real-time tracking and secure packaging.',
    },
    {
        icon: SupportIcon,
        title: 'Expert Technical Support',
        description: 'Our team of certified professionals is available to assist you with product selection and technical queries.',
    },
    {
        icon: SecurityIcon,
        title: 'Warranty & Returns',
        description: 'Comprehensive warranty coverage and hassle-free return policy for your peace of mind.',
    },
];

const categories = [
    {
        title: 'Fiber Optic Products',
        icon: CableIcon,
        description: 'High-quality fiber optic solutions including adapters, cables, connectors, and more.',
        link: '/products?category=Fiber%20Optic%20Products',
    },
    {
        title: 'Copper Products',
        icon: RouterIcon,
        description: 'Complete range of copper networking products for reliable connectivity solutions.',
        link: '/products?category=Copper%20Products',
    },
    {
        title: 'FTTH/GPON Products',
        icon: WifiIcon,
        description: 'Advanced FTTH/GPON equipment for modern fiber-to-the-home implementations.',
        link: '/products?category=FTTH%2FGPON%20Products',
    },
];

const Home = () => {
    return (
        <Box sx={{ mt: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                component="h1"
                                variant="h3"
                                color="text.primary"
                                gutterBottom
                                sx={{ fontWeight: 600 }}
                            >
                                Your Trusted Source for Network Infrastructure
                            </Typography>
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                paragraph
                                sx={{ mb: 4 }}
                            >
                                We provide high-quality fiber optic, copper, and FTTH/GPON products for all your networking needs. From cables to connectors, we've got you covered with professional-grade solutions.
                            </Typography>
                            <Button
                                component={RouterLink}
                                to="/products"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ 
                                    px: 4,
                                    py: 1,
                                    borderRadius: 2,
                                    color: 'text.banner',
                                    '&:hover': {
                                        color: 'text.banner'
                                    }
                                }}
                            >
                                Browse Products
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                                alt="Network Infrastructure"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: 400,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Grid item xs={12} sm={6} md={3} key={feature.title}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    <Icon
                                        sx={{
                                            fontSize: 48,
                                            color: 'text.primary',
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        gutterBottom
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {feature.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            {/* Main Categories Section */}
            <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h2"
                        align="center"
                        gutterBottom
                        sx={{ mb: 6, fontWeight: 600 }}
                    >
                        Our Product Categories
                    </Typography>
                    <Grid container spacing={4}>
                        {categories.map((category) => (
                            <Grid item xs={12} md={4} key={category.title}>
                                <Card
                                    component={RouterLink}
                                    to={category.link}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.12)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <category.icon sx={{ mr: 2, color: 'text.primary', fontSize: 40 }} />
                                            <Typography variant="h6" component="h3">
                                                {category.title}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {category.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* About Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                            About Our Company
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We are a leading provider of networking infrastructure solutions, specializing in fiber optic, copper, and FTTH/GPON products. With years of experience in the industry, we understand the critical importance of reliable and high-performance network components.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our commitment to quality and customer satisfaction has made us a trusted partner for businesses, ISPs, and telecommunications companies across the country.
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Button
                                component={RouterLink}
                                to="/about"
                                variant="outlined"
                                color="primary"
                                size="medium"
                                sx={{ 
                                    mt: 2,
                                    px: 3,
                                    py: 1,
                                    borderRadius: 2,
                                    borderWidth: '1px',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: 'text.primary',
                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        borderColor: 'rgba(0, 0, 0, 0.87)',
                                        backgroundColor: 'rgba(0, 0, 0, 0.03)',
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                Learn More About Us
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home; 