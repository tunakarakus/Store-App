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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Paper,
    CircularProgress,
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
    const viewParam = searchParams.get('view');
    
    const [currentCategory, setCurrentCategory] = useState(categoryParam || 'main');
    const [currentSubcategory, setCurrentSubcategory] = useState(subcategoryParam || null);
    const [navigationHistory, setNavigationHistory] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [filterText, setFilterText] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSubcategory, setFilterSubcategory] = useState('');
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
        } else {
            navigate('/products');
            setCurrentCategory('main');
            setCurrentSubcategory(null);
        }
    };

    const filteredProducts = products.filter(product => {
        // Text search filter
        const searchMatch = filterText === '' || 
            product.name.toLowerCase().includes(filterText.toLowerCase()) ||
            product.description?.toLowerCase().includes(filterText.toLowerCase()) ||
            product.category.toLowerCase().includes(filterText.toLowerCase()) ||
            product.subcategory?.toLowerCase().includes(filterText.toLowerCase());

        if (!searchMatch) return false;

        // Category and subcategory filters for all products view
        if (viewParam === 'all') {
            if (filterCategory && product.category !== filterCategory) return false;
            if (filterSubcategory && product.subcategory !== filterSubcategory) return false;
            return true;
        }

        // Category filters for normal view
        if (currentSubcategory) {
            return product.category === currentCategory && product.subcategory === currentSubcategory;
        } else if (currentCategory !== 'main' && viewParam !== 'all') {
            return product.category === currentCategory;
        }
        return true;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price_low':
                return a.price - b.price;
            case 'price_high':
                return b.price - a.price;
            default:
                return 0;
        }
    });

    const handleCategoryFilterChange = (event) => {
        const category = event.target.value;
        setFilterCategory(category);
        setFilterSubcategory(''); // Reset subcategory when category changes
    };

    const handleSubcategoryFilterChange = (event) => {
        setFilterSubcategory(event.target.value);
    };

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

    const renderFilters = () => {
        if (currentCategory === 'main' && !viewParam) return null;

        return (
            <Paper sx={{ p: 2, mb: 3 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs="auto">
                        <IconButton onClick={handleBackClick}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Search Products"
                            variant="outlined"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            size="small"
                        />
                    </Grid>
                    {viewParam === 'all' && (
                        <>
                            <Grid item xs={12} md={2}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={filterCategory}
                                        label="Category"
                                        onChange={handleCategoryFilterChange}
                                    >
                                        <MenuItem value="">All Categories</MenuItem>
                                        {categories.main.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Subcategory</InputLabel>
                                    <Select
                                        value={filterSubcategory}
                                        label="Subcategory"
                                        onChange={handleSubcategoryFilterChange}
                                        disabled={!filterCategory}
                                    >
                                        <MenuItem value="">All Subcategories</MenuItem>
                                        {filterCategory && categories[filterCategory]?.map((subcategory) => (
                                            <MenuItem key={subcategory.id} value={subcategory.id}>
                                                {subcategory.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12} md={viewParam === 'all' ? 2 : 3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={sortBy}
                                label="Sort By"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="name">Name (A-Z)</MenuItem>
                                <MenuItem value="price_low">Price (Low to High)</MenuItem>
                                <MenuItem value="price_high">Price (High to Low)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={viewParam === 'all' ? 2 : 3}>
                        <Typography variant="body2" color="text.secondary">
                            {filteredProducts.length} products found
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    const renderPageHeader = () => {
        return (
            <>
                <Box 
                    sx={{ 
                        bgcolor: 'background.banner',
                        color: 'text.banner',
                        py: 8,
                        mb: 4,
                        textAlign: 'center',
                        width: '100vw',
                        position: 'relative',
                        marginLeft: 'calc(-50vw + 50%)',
                        marginRight: 'calc(-50vw + 50%)',
                        left: 0,
                        right: 0,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                        backgroundImage: 'linear-gradient(to right, #7F0000, #B71C1C, #7F0000)',
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom 
                            sx={{ 
                                mb: 2,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                            }}
                        >
                            {viewParam === 'all'
                                ? 'All Products'
                                : currentSubcategory 
                                    ? categories[currentCategory]?.find(c => c.id === currentSubcategory)?.title
                                    : currentCategory === 'main'
                                        ? 'Products'
                                        : categories.main.find(c => c.id === currentCategory)?.title
                            }
                        </Typography>
                        {currentCategory === 'main' && !viewParam && (
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    opacity: 0.9,
                                    mt: 2,
                                    maxWidth: '800px',
                                    mx: 'auto',
                                    fontWeight: 400,
                                    lineHeight: 1.6,
                                }}
                            >
                                Browse our selection of high-quality networking products
                            </Typography>
                        )}
                    </Container>
                </Box>
                {(currentCategory !== 'main' || viewParam === 'all') && (
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <IconButton 
                                onClick={handleBackClick}
                                sx={{ 
                                    mr: 2,
                                    color: 'text.primary',
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                                    }
                                }}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Breadcrumbs separator="›">
                                {renderBreadcrumbs()}
                            </Breadcrumbs>
                        </Box>
                    </Container>
                )}
            </>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            );
        }

        if (viewParam === 'all' || currentSubcategory) {
            return (
                <>
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            {!viewParam && (
                                <Grid item xs="auto">
                                    <IconButton onClick={handleBackClick}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Grid>
                            )}
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Search Products"
                                    variant="outlined"
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                    size="small"
                                />
                            </Grid>
                            {viewParam === 'all' && (
                                <>
                                    <Grid item xs={12} md={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                value={filterCategory}
                                                label="Category"
                                                onChange={handleCategoryFilterChange}
                                            >
                                                <MenuItem value="">All Categories</MenuItem>
                                                {categories.main.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Subcategory</InputLabel>
                                            <Select
                                                value={filterSubcategory}
                                                label="Subcategory"
                                                onChange={handleSubcategoryFilterChange}
                                                disabled={!filterCategory}
                                            >
                                                <MenuItem value="">All Subcategories</MenuItem>
                                                {filterCategory && categories[filterCategory]?.map((subcategory) => (
                                                    <MenuItem key={subcategory.id} value={subcategory.id}>
                                                        {subcategory.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} md={viewParam === 'all' ? 2 : 3}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        label="Sort By"
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <MenuItem value="name">Name (A-Z)</MenuItem>
                                        <MenuItem value="price_low">Price (Low to High)</MenuItem>
                                        <MenuItem value="price_high">Price (High to Low)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={viewParam === 'all' ? 2 : 3}>
                                <Typography variant="body2" color="text.secondary">
                                    {filteredProducts.length} products found
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid container spacing={3}>
                        {filteredProducts.map((product) => (
                            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </>
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
            {renderPageHeader()}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                {(viewParam === 'all' || currentSubcategory) && (
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm>
                                <TextField
                                    fullWidth
                                    label="Search Products"
                                    variant="outlined"
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                    size="small"
                                />
                            </Grid>
                            {viewParam === 'all' && (
                                <>
                                    <Grid item xs={12} sm={6} md={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                value={filterCategory}
                                                label="Category"
                                                onChange={handleCategoryFilterChange}
                                            >
                                                <MenuItem value="">All Categories</MenuItem>
                                                {categories.main.map((category) => (
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Subcategory</InputLabel>
                                            <Select
                                                value={filterSubcategory}
                                                label="Subcategory"
                                                onChange={handleSubcategoryFilterChange}
                                                disabled={!filterCategory}
                                            >
                                                <MenuItem value="">All Subcategories</MenuItem>
                                                {filterCategory && categories[filterCategory]?.map((subcategory) => (
                                                    <MenuItem key={subcategory.id} value={subcategory.id}>
                                                        {subcategory.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </>
                            )}
                            <Grid item xs={12} sm={6} md={2}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        label="Sort By"
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <MenuItem value="name">Name (A-Z)</MenuItem>
                                        <MenuItem value="price_low">Price (Low to High)</MenuItem>
                                        <MenuItem value="price_high">Price (High to Low)</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm="auto">
                                <Typography variant="body2" color="text.secondary">
                                    {filteredProducts.length} products found
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
                {currentCategory === 'main' && !viewParam ? (
                    <Grid container spacing={4}>
                        {categories.main.map((category) => (
                            <Grid item xs={12} sm={6} md={4} key={category.id}>
                                <CategoryCard
                                    title={category.title}
                                    icon={category.icon}
                                    onClick={() => handleCategoryClick(category.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : currentCategory !== 'main' && !currentSubcategory && !viewParam ? (
                    <Grid container spacing={4}>
                        {categories[currentCategory]?.map((subcategory) => (
                            <Grid item xs={12} sm={6} md={4} key={subcategory.id}>
                                <CategoryCard
                                    title={subcategory.title}
                                    icon={subcategory.icon}
                                    onClick={() => handleCategoryClick(subcategory.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={3}>
                        {filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
};

export default Products; 