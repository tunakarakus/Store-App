import React from 'react';
import { useSelector } from 'react-redux';
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

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

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
                                label={`Credit: $${user?.credit?.toFixed(2) || '0.00'}`}
                                color="success"
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                Account Created
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {formatDate(user?.createdAt)}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                Email Verified
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {user?.emailVerified ? 'Yes' : 'No'}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                Account Status
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
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