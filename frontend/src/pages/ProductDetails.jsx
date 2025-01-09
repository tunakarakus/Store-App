import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Grid,
    Typography,
    Button,
    Box,
    Paper,
    CircularProgress,
    Alert,
    Divider,
    Chip,
    Snackbar,
} from '@mui/material';
import {
    ShoppingCart as ShoppingCartIcon,
    LocalShipping as LocalShippingIcon,
    Inventory as InventoryIcon,
} from '@mui/icons-material';
import { fetchProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);
    const product = products.find(p => p._id === id);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    useEffect(() => {
        if (!products.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error" sx={{ mt: 4 }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container>
                <Alert severity="info" sx={{ mt: 4 }}>
                    Product not found
                </Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Grid container spacing={4}>
                    {/* Product Image */}
                    <Grid item xs={12} md={6}>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                            }}
                        />
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography
                            variant="h5"
                            color="primary"
                            gutterBottom
                            sx={{ mb: 3 }}
                        >
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <InventoryIcon color="action" />
                                        <Typography>
                                            Stock:{' '}
                                            <Chip
                                                label={
                                                    product.stock > 0
                                                        ? 'In Stock'
                                                        : 'Out of Stock'
                                                }
                                                color={
                                                    product.stock > 0
                                                        ? 'success'
                                                        : 'error'
                                                }
                                                size="small"
                                            />
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <LocalShippingIcon color="action" />
                                        <Typography>
                                            Free shipping on orders over $50
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCartIcon />}
                            fullWidth
                            disabled={product.stock === 0}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Product added to cart"
                action={
                    <Button color="secondary" size="small" onClick={() => navigate('/cart')}>
                        View Cart
                    </Button>
                }
            />
        </Container>
    );
};

export default ProductDetails; 