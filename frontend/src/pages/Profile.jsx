import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Paper,
    Typography,
    Box,
    Avatar,
    Chip,
    Divider,
    Grid,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { convertPrice } from '../features/currencySlice';
import { verifyToken } from '../features/authSlice';

const currencies = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'Fr',
    CNY: '¥',
};

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { selectedCurrency, exchangeRates } = useSelector((state) => state.currency);

    useEffect(() => {
        // Fetch fresh user data when component mounts
        dispatch(verifyToken());
    }, [dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date) 
            ? date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'N/A';
    };

    // Convert credit to selected currency
    const convertedCredit = user?.credit ? convertPrice(user.credit, selectedCurrency, exchangeRates) : '0.00';
    const currencySymbol = currencies[selectedCurrency] || '$';

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 4,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: 'primary.main',
                                mb: 2,
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 60 }} />
                        </Avatar>
                        <Typography variant="h4" gutterBottom>
                            {user?.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {user?.email}
                        </Typography>
                        <Box sx={{ mt: 2, mb: 1 }}>
                            <Chip
                                label={`Credit: ${currencySymbol}${convertedCredit}`}
                                color="success"
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Account Created
                            </Typography>
                            <Typography variant="body1">
                                {formatDate(user?.createdAt)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Email Verified
                            </Typography>
                            <Typography variant="body1">
                                {user?.emailVerified ? 'Yes' : 'No'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Account Status
                            </Typography>
                            <Typography variant="body1">
                                Active
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
};

export default Profile; 