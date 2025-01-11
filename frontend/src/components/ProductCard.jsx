import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
    CardActionArea,
} from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedCurrency, exchangeRates } = useSelector((state) => state.currency);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    const handleProductClick = () => {
        navigate(`/products/${product._id}`);
    };

    // Get both standard and custom prices
    const standardPrice = product.standardPrice || product.price;
    const customPrice = product.price;
    const hasCustomPrice = product.standardPrice && product.standardPrice !== product.price;

    // Convert both prices
    const convertedStandardPrice = convertPrice(standardPrice, selectedCurrency, exchangeRates);
    const convertedCustomPrice = convertPrice(customPrice, selectedCurrency, exchangeRates);
    const currencySymbol = currencies[selectedCurrency];

    return (
        <Card 
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.12)',
                }
            }}
        >
            <CardActionArea onClick={handleProductClick}>
                <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl || 'https://via.placeholder.com/200'}
                    alt={product.name}
                    sx={{ objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mb: 2 }}>
                        {product.name}
                    </Typography>
                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            {hasCustomPrice && (
                                <Typography 
                                    variant="body1" 
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
                                variant="h6" 
                                color={hasCustomPrice ? "error" : "text.primary"}
                                sx={{ fontWeight: 600 }}
                            >
                                {currencySymbol}{convertedCustomPrice}
                            </Typography>
                        </Box>
                        <IconButton 
                            sx={{ 
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    color: 'text.primary',
                                }
                            }}
                            onClick={handleAddToCart}
                        >
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard; 