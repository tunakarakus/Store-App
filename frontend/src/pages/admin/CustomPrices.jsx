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
    TextField,
    MenuItem,
    IconButton,
    Alert,
    Container,
    Tooltip
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
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
    const [selectedUser, setSelectedUser] = useState('');
    const [customPrices, setCustomPrices] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUser) {
            fetchUserCustomPrices();
        }
    }, [selectedUser]);

    const fetchUserCustomPrices = async () => {
        try {
            const response = await api.get(`/custom-prices/user/${selectedUser}`);
            const priceMap = {};
            response.data.forEach(cp => {
                priceMap[cp.product._id] = cp.price;
            });
            setCustomPrices(priceMap);
            setHasChanges(false);
        } catch (error) {
            setError('Failed to fetch custom prices');
        }
    };

    const handlePriceChange = (productId, value) => {
        setCustomPrices(prev => ({
            ...prev,
            [productId]: value === '' ? '' : parseFloat(value)
        }));
        setHasChanges(true);
    };

    const handleSave = async () => {
        try {
            const updates = Object.entries(customPrices).map(([productId, price]) => ({
                userId: selectedUser,
                productId,
                price: price || null // null will remove the custom price
            }));

            await Promise.all(
                updates.map(update => 
                    update.price === null
                        ? api.delete(`/custom-prices/${update.userId}/${update.productId}`)
                        : api.post('/custom-prices', update)
                )
            );

            setSuccess('Custom prices updated successfully');
            setHasChanges(false);
            fetchUserCustomPrices();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update custom prices');
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

                <TextField
                    select
                    fullWidth
                    label="Select User"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    sx={{ mb: 3 }}
                >
                    {users.map((user) => (
                        <MenuItem key={user._id} value={user._id}>
                            {user.email}
                        </MenuItem>
                    ))}
                </TextField>

                {selectedUser && (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                            <Tooltip title={hasChanges ? 'Save changes' : 'No changes to save'}>
                                <span>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        onClick={handleSave}
                                        disabled={!hasChanges}
                                    >
                                        Save Changes
                                    </Button>
                                </span>
                            </Tooltip>
                        </Box>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Standard Price</TableCell>
                                        <TableCell>Custom Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>${product.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={customPrices[product._id] || ''}
                                                    onChange={(e) => handlePriceChange(product._id, e.target.value)}
                                                    inputProps={{ 
                                                        min: 0, 
                                                        step: 0.01,
                                                        style: { textAlign: 'right' }
                                                    }}
                                                    placeholder="No custom price"
                                                    size="small"
                                                    sx={{ width: '150px' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default CustomPrices; 