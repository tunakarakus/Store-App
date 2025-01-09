import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InventoryIcon from '@mui/icons-material/Inventory';

const About = () => {
    const features = [
        {
            icon: <InventoryIcon sx={{ fontSize: 60 }} />,
            title: 'Quality Products',
            description:
                'We offer a carefully curated selection of high-quality products.',
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 60 }} />,
            title: 'Fast Delivery',
            description:
                'Quick and reliable shipping to get your products to you as soon as possible.',
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 60 }} />,
            title: 'Secure Shopping',
            description:
                'Your security is our priority. Shop with confidence using our secure platform.',
        },
        {
            icon: <SupportAgentIcon sx={{ fontSize: 60 }} />,
            title: '24/7 Support',
            description:
                'Our customer service team is always here to help you with any questions.',
        },
    ];

    return (
        <Container maxWidth={false}>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: '#2A3942',
                    color: 'white',
                    py: 6,
                    mb: 4,
                    textAlign: 'center',
                    width: '100vw',
                    position: 'relative',
                    marginLeft: 'calc(-50vw + 50%)',
                    marginRight: 'calc(-50vw + 50%)',
                    left: 0,
                    right: 0,
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        align="center"
                    >
                        About Our Store
                    </Typography>
                    <Typography 
                        variant="h6" 
                        align="center" 
                        sx={{ opacity: 0.8 }}
                    >
                        Your one-stop destination for quality products and
                        exceptional service
                    </Typography>
                </Container>
            </Box>

            {/* Mission Statement */}
            <Container maxWidth={false} sx={{ mb: 8 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Our Mission
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    align="center"
                    sx={{ maxWidth: '800px', mx: 'auto' }}
                >
                    We are committed to providing our customers with the best
                    shopping experience possible. Our goal is to offer high-quality
                    products at competitive prices while maintaining exceptional
                    customer service. We believe in building long-lasting
                    relationships with our customers based on trust, reliability,
                    and satisfaction.
                </Typography>
            </Container>

            {/* Features Grid */}
            <Container maxWidth={false} sx={{ mb: 8 }}>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    p: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        color: 'primary.main',
                                        mb: 2,
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                >
                                    {feature.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Store Image */}
            <Container maxWidth={false} sx={{ mb: 8 }}>
                <Card>
                    <CardMedia
                        component="img"
                        height="400"
                        image="https://source.unsplash.com/random/?store"
                        alt="Store"
                        sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Our Store
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Located in the heart of the city, our store provides a
                            welcoming environment for all our customers. We take
                            pride in our carefully curated selection of products and
                            our commitment to customer satisfaction.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Container>
    );
};

export default About; 