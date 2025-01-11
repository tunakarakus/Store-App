import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { register } from '../features/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        const result = await dispatch(register(userData));
        if (!result.error) {
            navigate('/');
        }
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 64px)' }}
        >
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        mx: 'auto',
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 600, color: 'text.primary', mb: 4 }}
                    >
                        Register
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Sign In
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Register; 