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

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
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
                <Alert severity="info" sx={{ mt: 4 }}>Product not found</Alert>
            </Container>
        );
    }

    return (
        <>
            <Box sx={{ bgcolor: '#2A3942', color: 'white', py: 4 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton color="inherit" onClick={handleBack}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Breadcrumbs separator="›" sx={{ color: 'white' }}>
                            <Link color="inherit" sx={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
                                Products
                            </Link>
                            <Link color="inherit" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/products?category=${encodeURIComponent(product.category)}`)}>
                                {product.category}
                            </Link>
                            <Link color="inherit" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/products?category=${encodeURIComponent(product.category)}&subcategory=${encodeURIComponent(product.subcategory)}`)}>
                                {product.subcategory}
                            </Link>
                            <Typography color="inherit">{product.name}</Typography>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 16 }}>
                <Grid container spacing={6}>
                    {/* Product Image */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: 'sticky', top: 24 }}>
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    maxHeight: '600px',
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ position: 'sticky', top: 24 }}>
                            <Typography variant="h4" gutterBottom>
                                {product.name}
                            </Typography>
                            
                            <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 3 }}>
                                ${product.price.toFixed(2)}
                            </Typography>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>

                            <Box sx={{ mb: 4 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <InventoryIcon color="action" />
                                            <Typography>
                                                Stock:{' '}
                                                <Chip
                                                    label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    color={product.stock > 0 ? 'success' : 'error'}
                                                    size="small"
                                                />
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocalShippingIcon color="action" />
                                            <Typography>
                                                Free shipping on orders over $50
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            {product.specifications && (
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Specifications
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 2 }}>
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <Typography component="li" key={key}>
                                                <strong>{key}:</strong> {value}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            )}

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingCartIcon />}
                                fullWidth
                                disabled={product.stock === 0}
                                onClick={handleAddToCart}
                                sx={{ py: 1.5 }}
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
                    message="Product added to cart"
                    action={
                        <Button color="secondary" size="small" onClick={() => navigate('/cart')}>
                            View Cart
                        </Button>
                    }
                />
            </Container>
        </>
    );
};

export default ProductDetails; 