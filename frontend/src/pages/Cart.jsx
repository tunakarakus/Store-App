import React, { useEffect, useCallback, useRef } from 'react';
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
    Container,
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon,
    ShoppingCartCheckout as ShoppingCartCheckoutIcon,
} from '@mui/icons-material';
import { removeFromCart, updateCartItem, fetchCart, updateQuantityLocally, refreshCart } from '../features/cartSlice';
import { convertPrice, fetchExchangeRates } from '../features/currencySlice';

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

const Cart = () => {
    const dispatch = useDispatch();
    const { items, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
    const { selectedCurrency, exchangeRates } = useSelector((state) => state.currency);
    const updateQueue = useRef({});
    const updateTimeoutRef = useRef({});

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        dispatch(refreshCart());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCurrency) {
            dispatch(refreshCart());
        }
    }, [selectedCurrency, dispatch]);

    // Debounced update function
    const debouncedUpdate = useCallback(
        debounce((productId, newQuantity) => {
            dispatch(updateCartItem({ productId, quantity: newQuantity }));
        }, 200),
        [dispatch]
    );

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity >= 1) {
            // Clear any pending timeout for this product
            if (updateTimeoutRef.current[productId]) {
                clearTimeout(updateTimeoutRef.current[productId]);
            }

            // Update UI immediately
            dispatch(updateQuantityLocally({ productId, quantity: newQuantity }));

            // Set a new timeout for this product
            updateTimeoutRef.current[productId] = setTimeout(async () => {
                try {
                    await dispatch(updateCartItem({ productId, quantity: newQuantity })).unwrap();
                } catch (error) {
                    // If the update fails, refresh the cart to get the correct state
                    dispatch(fetchCart());
                }
            }, 500);
        }
    };

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            Object.values(updateTimeoutRef.current).forEach(timeout => {
                clearTimeout(timeout);
            });
        };
    }, []);

    const handleRemoveItem = async (productId) => {
        // Optimistically update UI first
        const updatedItems = items.filter(item => item.product !== productId);
        dispatch(updateQuantityLocally({ items: updatedItems }));
        
        try {
            await dispatch(removeFromCart(productId)).unwrap();
        } catch (error) {
            // If the delete fails, refresh the cart to get the correct state
            dispatch(fetchCart());
        }
    };

    // Function to safely convert and display item price
    const getItemPrice = (price) => {
        const numericPrice = parseFloat(price) || 0;
        if (!exchangeRates || !selectedCurrency) {
            return numericPrice.toFixed(2);
        }
        return convertPrice(numericPrice, selectedCurrency, exchangeRates);
    };

    // Function to safely calculate and display item total
    const getItemTotal = (price, quantity) => {
        const numericPrice = parseFloat(price) || 0;
        if (!exchangeRates || !selectedCurrency) {
            return (numericPrice * quantity).toFixed(2);
        }
        return convertPrice(numericPrice * quantity, selectedCurrency, exchangeRates);
    };

    const calculateTotal = () => {
        const total = items.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            return total + price * item.quantity;
        }, 0);
        
        if (!exchangeRates || !selectedCurrency) {
            return total.toFixed(2);
        }
        return convertPrice(total, selectedCurrency, exchangeRates);
    };

    const currencySymbol = currencies[selectedCurrency] || '$';

    // Only show loading for cart loading, not for exchange rates
    if (cartLoading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (cartError) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
                <Alert severity="error">{cartError}</Alert>
            </Container>
        );
    }

    if (!items || items.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ 
                mt: 4, 
                mb: 8,
                minHeight: 'calc(100vh - 400px)', // Account for header and footer
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{ 
                    textAlign: 'center',
                    py: 8 // Add vertical padding
                }}>
                    <CartIcon sx={{ 
                        fontSize: 100, // Made icon slightly larger
                        color: 'text.secondary', 
                        mb: 4 // Increased bottom margin
                    }} />
                    <Typography 
                        variant="h4" // Made text slightly larger
                        color="text.primary" 
                        gutterBottom
                        sx={{ mb: 3 }} // Added more space below text
                    >
                        Your cart is empty
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="/products"
                        variant="contained"
                        size="large"
                        sx={{ mt: 4, px: 4, py: 1.5 }} // Made button more prominent
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Shopping Cart
            </Typography>
            <Grid container spacing={3}>
                {/* Product List - Takes 8 columns on medium and larger screens */}
                <Grid item xs={12} md={8}>
                    <TableContainer 
                        component={Paper} 
                        sx={{ 
                            maxHeight: 'calc(100vh - 200px)',
                            overflow: 'auto'
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell />
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
                                                        objectFit: 'contain',
                                                        marginRight: 16,
                                                    }}
                                                />
                                                <Typography>{item.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            {currencySymbol}{getItemPrice(item.price)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleUpdateQuantity(item.product, item.quantity - 1)}
                                                    sx={{ 
                                                        color: 'text.primary',
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                            color: 'text.primary'
                                                        }
                                                    }}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        if (!isNaN(value) && value >= 1) {
                                                            handleUpdateQuantity(item.product, value);
                                                        }
                                                    }}
                                                    onBlur={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        if (isNaN(value) || value < 1) {
                                                            handleUpdateQuantity(item.product, 1);
                                                        }
                                                    }}
                                                    style={{
                                                        width: '40px',
                                                        textAlign: 'center',
                                                        padding: '8px',
                                                        backgroundColor: '#fff',
                                                        color: '#000',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '4px',
                                                        fontSize: '14px',
                                                        margin: '0 8px',
                                                        '-moz-appearance': 'textfield',
                                                    }}
                                                    min="1"
                                                />
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleUpdateQuantity(item.product, item.quantity + 1)}
                                                    sx={{ 
                                                        color: 'text.primary',
                                                        '&:hover': {
                                                            backgroundColor: 'transparent',
                                                            color: 'text.primary'
                                                        }
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                                <style>
                                                    {`
                                                        input::-webkit-outer-spin-button,
                                                        input::-webkit-inner-spin-button {
                                                            -webkit-appearance: none;
                                                            margin: 0;
                                                        }
                                                    `}
                                                </style>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            {currencySymbol}{getItemTotal(item.price, item.quantity)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => handleRemoveItem(item.product)}
                                                sx={{ 
                                                    color: 'text.primary',
                                                    '&:hover': {
                                                        backgroundColor: 'transparent',
                                                        color: 'text.primary'
                                                    }
                                                }}
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

                {/* Checkout Section - Takes 4 columns on medium and larger screens */}
                <Grid item xs={12} md={4}>
                    <Paper 
                        elevation={3}
                        sx={{
                            p: 3,
                            position: 'sticky',
                            top: 24,
                            bgcolor: 'background.paper'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Box sx={{ mb: 3 }}>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                mb: 2
                            }}>
                                <Typography color="text.secondary">
                                    Subtotal
                                </Typography>
                                <Typography>
                                    {currencySymbol}{calculateTotal()}
                                </Typography>
                            </Box>
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                mb: 2,
                                pt: 2,
                                borderTop: 1,
                                borderColor: 'divider'
                            }}>
                                <Typography variant="h6">
                                    Total
                                </Typography>
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                                    {currencySymbol}{calculateTotal()}
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            startIcon={<ShoppingCartCheckoutIcon sx={{ color: 'text.banner' }} />}
                        >
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart; 