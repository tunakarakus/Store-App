import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './utils/theme';
import store from './app/store';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { verifyToken } from './features/authSlice';
import { fetchCart } from './features/cartSlice';
import { fetchExchangeRates } from './features/currencySlice';

// Import pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import AdminUsers from './pages/admin/Users';

const AppContent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Initial data fetching
        dispatch(verifyToken());
        dispatch(fetchCart());
        
        // Fetch exchange rates immediately
        console.log('Initial exchange rates fetch...');
        dispatch(fetchExchangeRates());

        // Set up interval to fetch exchange rates every hour
        const interval = setInterval(() => {
            console.log('Fetching fresh exchange rates...');
            dispatch(fetchExchangeRates());
        }, 3600000); // 1 hour in milliseconds

        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    
                    {/* Admin Routes */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/products"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <AdminProducts />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/products/new"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <AddProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/products/edit/:id"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <EditProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <AdminUsers />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Layout>
        </Router>
    );
};

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppContent />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
