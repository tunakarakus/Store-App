import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
} from '@mui/material';

const About = () => {
    const references = [
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/att.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/turkcell.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/zte.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/vodafone.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/vnpt.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/viettel.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/turktelekom.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/turksat.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/turkcell_superonline.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/siemens.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/ronesans.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/orange.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/netaY.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/huawei.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/fpt.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/etisalat.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/china_telekom.jpg' },
        { imageUrl: 'https://www.bcfiber.com/yukleme/referanslar/o2.jpg' }
    ];

    return (
        <>
            {/* Hero Section with Dark Background */}
            <Box
                sx={{
                    bgcolor: '#2A3942',
                    color: 'white',
                    py: 6,
                    mb: 4,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h1" gutterBottom>
                        About Us
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* Who We Are Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" gutterBottom>
                        Who Are We?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        As a committed and hard-working manufacturer of passive optical fiber components, BC Fiber Optic is a well-rounded international provider. The company has been thriving and improving in accordance with the technological innovations and the customer needs and requests since its foundation. What has begun as a trading company in 2008 became an ever-growing manufacturing, trade and stock company within the years. We now operate globally with 3 manufacturing facilities in Vietnam, China and Turkey and with 10 sales offices 2 being in USA, 2 being in Russia and the others being in Hong Kong, China, Turkey, Spain, Italy, and France.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We have our own distribution system and warehouses throughout the world. Every local office has its own warehouse. With modern equipment and manufacturing processes we have and the high focus we maintain on quality control to provide high quality at affordable prices, we supply materials to many big international companies, particularly the telecommunication companies.
                    </Typography>
                </Box>

                {/* Vision Section */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" gutterBottom>
                        Our Vision
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Considering the customer satisfaction and product quality as the first priority, our vision is to deliver prudential materials to the appreciation of our customers with economical prices. To remain up-to-date, environment-friendly and to be a strong company which makes substantial contributions to a bright future of a connected world.
                    </Typography>
                </Box>

                {/* Mission Section */}
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h4" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" component="div">
                        <Box component="ul" sx={{ listStyle: 'none', pl: 0 }}>
                            <Box component="li" sx={{ mb: 1 }}>
                                • To create proactive solutions with cutting-edge technology in order to increase the efficiency of the products we supply.
                            </Box>
                            <Box component="li" sx={{ mb: 1 }}>
                                • To be environmentally responsible while operating, to consider the public welfare and to produce safe, sustainable products.
                            </Box>
                            <Box component="li" sx={{ mb: 1 }}>
                                • To be committed to the unconditional customer satisfaction and make an infinite effort to provide the materials with the most economical prices possible in the market.
                            </Box>
                        </Box>
                    </Typography>
                </Box>

                {/* References Section */}
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                        Our References
                    </Typography>
                    <Grid container spacing={3}>
                        {references.map((reference, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        height: '100px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={reference.imageUrl}
                                        alt="Company Reference"
                                        sx={{
                                            maxWidth: '100%',
                                            maxHeight: '80px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default About; 