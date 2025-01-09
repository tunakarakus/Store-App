import React, { useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
            title: 'Address',
            content: '123 Store Street, City, Country',
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 40 }} />,
            title: 'Phone',
            content: '+1 234 567 8900',
        },
        {
            icon: <EmailIcon sx={{ fontSize: 40 }} />,
            title: 'Email',
            content: 'contact@storeapp.com',
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
                        Contact Us
                    </Typography>
                    <Typography 
                        variant="h6" 
                        align="center" 
                        sx={{ opacity: 0.8 }}
                    >
                        We'd love to hear from you
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth={false} sx={{ mb: 8 }}>
                <Grid container spacing={4}>
                    {/* Contact Information */}
                    <Grid item xs={12} md={4}>
                        <Grid container spacing={3}>
                            {contactInfo.map((info, index) => (
                                <Grid item xs={12} key={index}>
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
                                            {info.icon}
                                        </Box>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            gutterBottom
                                        >
                                            {info.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            {info.content}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Contact Form */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="h4"
                                                gutterBottom
                                                align="center"
                                            >
                                                Send us a Message
                                            </Typography>
                                        </Grid>
                                        {submitted && (
                                            <Grid item xs={12}>
                                                <Alert severity="success">
                                                    Thank you for your message! We'll
                                                    get back to you soon.
                                                </Alert>
                                            </Grid>
                                        )}
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Message"
                                                name="message"
                                                multiline
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                fullWidth
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
};

export default Contact; 