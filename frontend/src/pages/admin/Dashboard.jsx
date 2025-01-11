import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import {
    People as PeopleIcon,
    Inventory as InventoryIcon,
    ShoppingCart as CartIcon,
    AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { fetchUsers } from '../../features/userSlice';
import { fetchProducts } from '../../features/productSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchProducts());
    }, [dispatch]);

    const stats = {
        products: products.length,
        users: users.length,
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

    const adminActions = [
        {
            title: 'Manage Users',
            icon: <PeopleIcon />,
            onClick: () => navigate('/admin/users'),
            color: '#2196f3'
        },
        {
            title: 'Manage Products',
            icon: <InventoryIcon />,
            onClick: () => navigate('/admin/products'),
            color: '#4caf50'
        },
        {
            title: 'Custom Prices',
            icon: <MoneyIcon />,
            onClick: () => navigate('/admin/custom-prices'),
            color: '#ff9800'
        },
        {
            title: 'View Orders',
            icon: <CartIcon />,
            onClick: () => navigate('/admin/orders'),
            color: '#f44336'
        }
    ];

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

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <PeopleIcon sx={{ fontSize: 40, mb: 1, color: 'text.primary' }} />
                        <Typography variant="h4" color="text.primary">{stats.users}</Typography>
                        <Typography color="text.secondary">Total Users</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <InventoryIcon sx={{ fontSize: 40, mb: 1, color: 'text.primary' }} />
                        <Typography variant="h4" color="text.primary">{stats.products}</Typography>
                        <Typography color="text.secondary">Products</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <MoneyIcon sx={{ fontSize: 40, mb: 1, color: 'text.primary' }} />
                        <Typography variant="h4" color="text.primary">5</Typography>
                        <Typography color="text.secondary">Total Earnings</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <CartIcon sx={{ fontSize: 40, mb: 1, color: 'text.primary' }} />
                        <Typography variant="h4" color="text.primary">{stats.orders}</Typography>
                        <Typography color="text.secondary">Total Orders</Typography>
                    </Paper>
                </Grid>
            </Grid>


            {/* Admin Actions */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {adminActions.map((action) => (
                    <Grid item xs={12} sm={6} md={3} key={action.title}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },
                            }}
                            onClick={action.onClick}
                        >
                            <Box sx={{ color: action.color, mb: 2 }}>
                                {action.icon}
                            </Box>
                            <Typography variant="h6" align="center">
                                {action.title}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Orders */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Recent Orders
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>#{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>${order.amount}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            color={getStatusColor(order.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Dashboard; 