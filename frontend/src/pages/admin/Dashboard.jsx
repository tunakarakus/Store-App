import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Chip,
} from '@mui/material';
import {
    Inventory as InventoryIcon,
    People as PeopleIcon,
    ShoppingCart as CartIcon,
} from '@mui/icons-material';

const Dashboard = () => {
    const navigate = useNavigate();

    const stats = {
        products: 41,
        users: 1,
        orders: 1250,
    };

    const recentOrders = [
        { id: 1, customer: 'John Doe', amount: 299.99, status: 'Delivered' },
        { id: 2, customer: 'Jane Smith', amount: 199.99, status: 'Processing' },
        { id: 3, customer: 'Bob Johnson', amount: 499.99, status: 'Pending' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'success';
            case 'Processing':
                return 'info';
            case 'Pending':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: 'calc(100vh - 64px)',
                p: 3,
                bgcolor: 'background.default',
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome back! Here's what's happening with your store today.
                </Typography>
            </Box>

            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/products')}
                >
                    Manage Products
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/users')}
                >
                    Manage Users
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            height: '100%',
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <InventoryIcon color="primary" sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h6" color="text.secondary">
                            Total Products
                        </Typography>
                        <Typography variant="h3" component="div">
                            {stats.products}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            height: '100%',
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h6" color="text.secondary">
                            Total Users
                        </Typography>
                        <Typography variant="h3" component="div">
                            {stats.users}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            height: '100%',
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            <CartIcon color="primary" sx={{ fontSize: 40 }} />
                        </Box>
                        <Typography variant="h6" color="text.secondary">
                            Total Orders
                        </Typography>
                        <Typography variant="h3" component="div">
                            {stats.orders}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Recent Orders
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {recentOrders.map((order) => (
                        <Box
                            key={order.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                py: 2,
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                '&:last-child': {
                                    borderBottom: 'none',
                                },
                            }}
                        >
                            <Box>
                                <Typography variant="subtitle1">
                                    {order.customer}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Order #{order.id}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Typography variant="subtitle1">
                                    ${order.amount.toFixed(2)}
                                </Typography>
                                <Chip
                                    label={order.status}
                                    color={getStatusColor(order.status)}
                                    size="small"
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
};

export default Dashboard; 