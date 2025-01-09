import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
    Grid,
    Button,
    Divider,
} from '@mui/material';
import { Close as CloseIcon, AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductDetail = ({ product, open, onClose }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    if (!product) return null;

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{product.name}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="img"
                            src={product.imageUrl || 'https://via.placeholder.com/400'}
                            alt={product.name}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                mb: 2
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            ${product.price.toFixed(2)}
                        </Typography>
                        
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Category: {product.category} {'>'} {product.subcategory}
                        </Typography>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="body1" paragraph>
                            {product.description || 'No description available.'}
                        </Typography>
                        
                        {product.specifications && (
                            <>
                                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                                    Specifications
                                </Typography>
                                <Box component="ul" sx={{ pl: 2 }}>
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <Typography component="li" key={key}>
                                            <strong>{key}:</strong> {value}
                                        </Typography>
                                    ))}
                                </Box>
                            </>
                        )}
                        
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={handleAddToCart}
                            sx={{ mt: 4 }}
                            fullWidth
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetail; 