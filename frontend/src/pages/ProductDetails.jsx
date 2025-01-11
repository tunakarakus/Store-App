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
    Breadcrumbs,
    Link,
    IconButton,
} from '@mui/material';
import {
    ShoppingCart as ShoppingCartIcon,
    LocalShipping as LocalShippingIcon,
    Inventory as InventoryIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { fetchProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import { convertPrice } from '../features/currencySlice';

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

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const { selectedCurrency, exchangeRates } = useSelector((state) => state.currency);
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

    const handleBack = () => {
        navigate(-1);
    };

    const currencySymbol = currencies[selectedCurrency] || '$';
    const convertedPrice = product ? convertPrice(parseFloat(product.price), selectedCurrency, exchangeRates) : '0.00';
    const convertedStandardPrice = product && product.standardPrice ? convertPrice(parseFloat(product.standardPrice), selectedCurrency, exchangeRates) : '0.00';

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container>
                <Alert severity="error" sx={{ mt: 4 }}>Product not found</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onClick={handleBack}
                        sx={{ 
                            mr: 2,
                            color: 'text.primary',
                            '&:hover': {
                                bgcolor: 'rgba(0, 0, 0, 0.04)',
                                color: 'text.primary'
                            }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" onClick={() => navigate('/products')} sx={{ cursor: 'pointer' }}>
                            Products
                        </Link>
                        <Link color="inherit" onClick={() => navigate(`/products?category=${product.category}`)} sx={{ cursor: 'pointer' }}>
                            {product.category}
                        </Link>
                        <Typography color="text.primary">{product.name}</Typography>
                    </Breadcrumbs>
                </Box>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ position: 'sticky', top: 24 }}>
                        <Typography variant="h4" gutterBottom>
                            {product.name}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            {product.standardPrice && product.standardPrice !== product.price && (
                                <Typography 
                                    variant="h5" 
                                    color="text.secondary" 
                                    sx={{ 
                                        textDecoration: 'line-through',
                                        display: 'block'
                                    }}
                                >
                                    {currencySymbol}{convertedStandardPrice}
                                </Typography>
                            )}
                            <Typography 
                                variant="h4" 
                                color={product.standardPrice && product.standardPrice !== product.price ? "error" : "text.primary"}
                                sx={{ fontWeight: 600 }}
                            >
                                {currencySymbol}{convertedPrice}
                            </Typography>
                        </Box>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="body1" paragraph>
                            {product.description || 'No description available.'}
                        </Typography>

                        <Box sx={{ mt: 3, mb: 2 }}>
                            <Chip
                                icon={<InventoryIcon />}
                                label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                color={product.stock > 0 ? 'success' : 'error'}
                                sx={{ mr: 1 }}
                            />
                            <Chip
                                icon={<LocalShippingIcon />}
                                label="Free Shipping"
                                color="primary"
                            />
                        </Box>
                        
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCartIcon sx={{ color: 'text.banner' }} />}
                            onClick={handleAddToCart}
                            fullWidth
                            disabled={product.stock <= 0}
                            sx={{ mt: 2 }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="Added to cart"
            />
        </Container>
    );
};

export default ProductDetails; 