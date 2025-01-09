import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import debounce from 'lodash/debounce';
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { removeFromCart, updateCartItem, fetchCart, updateQuantityLocally } from '../features/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    // Debounced update function
    const debouncedUpdate = useCallback(
        debounce((productId, newQuantity) => {
            dispatch(updateCartItem({ productId, quantity: newQuantity }));
        }, 500),
        [dispatch]
    );

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity >= 1) {
            // Update UI immediately
            dispatch(updateQuantityLocally({ productId, quantity: newQuantity }));
            // Debounce the API call
            debouncedUpdate(productId, newQuantity);
        }
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (loading) {
        return (
            <Box
                sx={{
                    width: '100vw',
                    height: 'calc(100vh - 64px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    width: '100vw',
                    height: 'calc(100vh - 64px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                }}
            >
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (items.length === 0) {
        return (
            <Box
                sx={{
                    width: '100vw',
                    height: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    <CartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
                    <Typography variant="h5" color="text.primary" gutterBottom>
                        Your cart is empty
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/products"
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: 'calc(100vh - 64px)',
                p: 3,
                bgcolor: 'background.default',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.product}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        marginRight: 16,
                                                        objectFit: 'cover',
                                                        borderRadius: 4,
                                                    }}
                                                />
                                                <Typography>{item.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            ${item.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleUpdateQuantity(item.product, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || loading}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography sx={{ mx: 2 }}>
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleUpdateQuantity(item.product, item.quantity + 1)}
                                                    disabled={loading}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleRemoveItem(item.product)}
                                                disabled={loading}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Subtotal</Typography>
                                <Typography>${calculateTotal().toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Shipping</Typography>
                                <Typography>
                                    {calculateTotal() >= 50 ? 'Free' : '$5.00'}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 2,
                                    pt: 2,
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6">
                                    ${(calculateTotal() + (calculateTotal() >= 50 ? 0 : 5)).toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            component={RouterLink}
                            to="/checkout"
                            disabled={loading}
                        >
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Cart; 