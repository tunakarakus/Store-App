import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    IconButton,
    Alert,
    Container
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
import { fetchUsers } from '../../features/userSlice';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CustomPrices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const users = useSelector(state => state.users.users);
    const [customPrices, setCustomPrices] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [customPrice, setCustomPrice] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchUsers());
        fetchCustomPrices();
    }, [dispatch]);

    const fetchCustomPrices = async () => {
        try {
            const response = await api.get('/custom-prices/all');
            setCustomPrices(response.data);
        } catch (error) {
            setError('Failed to fetch custom prices');
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setError(null);
        setSuccess(null);
        setSelectedUser('');
        setSelectedProduct('');
        setCustomPrice('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            await api.post('/custom-prices', {
                userId: selectedUser,
                productId: selectedProduct,
                price: parseFloat(customPrice)
            });
            fetchCustomPrices();
            setSuccess('Custom price set successfully');
            handleClose();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to set custom price');
        }
    };

    const handleDelete = async (userId, productId) => {
        try {
            await api.delete(`/custom-prices/${userId}/${productId}`);
            fetchCustomPrices();
            setSuccess('Custom price deleted successfully');
        } catch (error) {
            setError('Failed to delete custom price');
        }
    };

    return (
        <Container>
            <Box sx={{ mb: 4, mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <IconButton 
                        onClick={() => navigate('/admin/dashboard')}
                        color="primary"
                        sx={{ p: 0 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" component="h1">
                        Custom Prices
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                    >
                        Add Custom Price
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Standard Price</TableCell>
                                <TableCell>Custom Price</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customPrices.map((cp) => (
                                <TableRow key={`${cp.user._id}-${cp.product._id}`}>
                                    <TableCell>{cp.user.email}</TableCell>
                                    <TableCell>{cp.product.name}</TableCell>
                                    <TableCell>${cp.product.price.toFixed(2)}</TableCell>
                                    <TableCell>${cp.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDelete(cp.user._id, cp.product._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Custom Price</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        fullWidth
                        label="User"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        {users.map((user) => (
                            <MenuItem key={user._id} value={user._id}>
                                {user.email}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        fullWidth
                        label="Product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        sx={{ mb: 2 }}
                    >
                        {products.map((product) => (
                            <MenuItem key={product._id} value={product._id}>
                                {product.name} (${product.price})
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        label="Custom Price"
                        type="number"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                        inputProps={{ min: 0, step: 0.01 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!selectedUser || !selectedProduct || !customPrice}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CustomPrices; 