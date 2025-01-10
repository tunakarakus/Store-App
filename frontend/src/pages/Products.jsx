import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Grid,
    Typography,
    Box,
    Breadcrumbs,
    Link,
    IconButton,
} from '@mui/material';
import {
    Category as CategoryIcon,
    Cable as CableIcon,
    Router as RouterIcon,
    Settings as SettingsIcon,
    ArrowBack as ArrowBackIcon,
    Devices as DevicesIcon,
    Build as BuildIcon,
    Storage as StorageIcon,
    Speed as SpeedIcon,
    Wifi as WifiIcon,
} from '@mui/icons-material';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../features/productSlice';
import { useSearchParams, useNavigate } from 'react-router-dom';

const categories = {
    main: [
        { id: 'Fiber Optic Products', title: 'Fiber Optic Products', icon: CableIcon },
        { id: 'Copper Products', title: 'Copper Products', icon: RouterIcon },
        { id: 'FTTH/GPON Products', title: 'FTTH/GPON Products', icon: WifiIcon },
    ],
    'Fiber Optic Products': [
        { id: 'Adapters', title: 'Adapters', icon: DevicesIcon },
        { id: 'Drop Cables', title: 'Drop Cables', icon: CableIcon },
        { id: 'Connectors', title: 'Connectors', icon: BuildIcon },
        { id: 'Patch Cords', title: 'Patch Cords', icon: CableIcon },
        { id: 'Pigtails', title: 'Pigtails', icon: CableIcon },
        { id: 'Splitters', title: 'Splitters', icon: StorageIcon },
        { id: 'Attenuators', title: 'Attenuators', icon: SpeedIcon },
    ],
    'Copper Products': [
        { id: 'Copper Cables', title: 'Copper Cables', icon: CableIcon },
        { id: 'Copper Patch Cords', title: 'Copper Patch Cords', icon: CableIcon },
        { id: 'Copper Patch Panels', title: 'Copper Patch Panels', icon: StorageIcon },
        { id: 'Face Plates', title: 'Face Plates', icon: DevicesIcon },
        { id: 'Keystone Jacks', title: 'Keystone Jacks', icon: BuildIcon },
    ],
    'FTTH/GPON Products': [
        { id: 'Wall Mount Panels', title: 'Wall Mount Panels', icon: StorageIcon },
        { id: 'Rack Mount Panels', title: 'Rack Mount Panels', icon: StorageIcon },
        { id: 'Splice Closures', title: 'Splice Closures', icon: DevicesIcon },
    ],
};

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    const [searchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');
    
    const [currentCategory, setCurrentCategory] = useState(categoryParam || 'main');
    const [currentSubcategory, setCurrentSubcategory] = useState(subcategoryParam || null);
    const [navigationHistory, setNavigationHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (categoryParam) {
            setCurrentCategory(categoryParam);
            setCurrentSubcategory(subcategoryParam || null);
        } else {
            setCurrentCategory('main');
            setCurrentSubcategory(null);
        }
    }, [categoryParam, subcategoryParam]);

    const handleCategoryClick = (categoryId) => {
        if (currentCategory === 'main') {
            navigate(`/products?category=${encodeURIComponent(categoryId)}`);
            setCurrentCategory(categoryId);
            setCurrentSubcategory(null);
        } else {
            navigate(`/products?category=${encodeURIComponent(currentCategory)}&subcategory=${encodeURIComponent(categoryId)}`);
            setCurrentSubcategory(categoryId);
        }
    };

    const handleBackClick = () => {
        if (currentSubcategory) {
            navigate(`/products?category=${encodeURIComponent(currentCategory)}`);
            setCurrentSubcategory(null);
        } else if (currentCategory !== 'main') {
            navigate('/products');
            setCurrentCategory('main');
            setCurrentSubcategory(null);
        }
    };

    const filteredProducts = products.filter(product => {
        if (currentSubcategory) {
            return product.category === currentCategory && product.subcategory === currentSubcategory;
        } else if (currentCategory !== 'main') {
            return product.category === currentCategory;
        }
        return true;
    });

    const renderBreadcrumbs = () => {
        const items = [];
        if (currentCategory !== 'main') {
            items.push(
                <Link
                    key="main"
                    color="inherit"
                    onClick={() => {
                        setCurrentCategory('main');
                        setCurrentSubcategory(null);
                        setNavigationHistory([]);
                    }}
                    sx={{ cursor: 'pointer' }}
                >
                    Products
                </Link>
            );
            items.push(
                <Typography key="category" color="text.primary">
                    {categories.main.find(c => c.id === currentCategory)?.title}
                </Typography>
            );
            if (currentSubcategory) {
                items.push(
                    <Typography key="subcategory" color="text.primary">
                        {categories[currentCategory]?.find(c => c.id === currentSubcategory)?.title}
                    </Typography>
                );
            }
        }
        return items;
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setDetailOpen(true);
    };

    const handleDetailClose = () => {
        setDetailOpen(false);
        setSelectedProduct(null);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Typography>Loading products...</Typography>
                </Box>
            );
        }

        if (currentSubcategory) {
            if (filteredProducts.length === 0) {
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Typography>No products found in this category.</Typography>
                    </Box>
                );
            }

            return (
                <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                            <ProductCard 
                                product={product} 
                                onProductClick={handleProductClick}
                            />
                        </Grid>
                    ))}
                </Grid>
            );
        }

        const currentCategories = currentCategory === 'main' 
            ? categories.main 
            : categories[currentCategory] || [];

        return (
            <Grid container spacing={3}>
                {currentCategories.map((category) => (
                    <Grid item key={category.id} xs={12} sm={6} md={4}>
                        <CategoryCard
                            title={category.title}
                            icon={category.icon}
                            onClick={() => handleCategoryClick(category.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <>
            <Box 
                sx={{ 
                    bgcolor: '#2A3942',
                    color: 'white',
                    py: 6,
                    mb: 4,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h1" gutterBottom>
                        {currentSubcategory 
                            ? categories[currentCategory]?.find(c => c.id === currentSubcategory)?.title
                            : currentCategory === 'main' 
                                ? 'Products'
                                : categories.main.find(c => c.id === currentCategory)?.title
                        }
                    </Typography>
                    {currentCategory === 'main' && (
                        <Typography variant="h6" color="inherit" sx={{ opacity: 0.8 }}>
                            Browse our selection of high-quality networking products
                        </Typography>
                    )}
                </Container>
            </Box>
            
            <Container maxWidth={false} sx={{ px: 4, mb: 8 }}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    {currentCategory !== 'main' && (
                        <IconButton onClick={handleBackClick} sx={{ mr: 2 }}>
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {renderBreadcrumbs()}
                    </Breadcrumbs>
                </Box>
                {renderContent()}
            </Container>
        </>
    );
};

export default Products; 