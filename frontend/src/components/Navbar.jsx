import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Container,
    ClickAwayListener,
    Avatar,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { 
    ShoppingCart as ShoppingCartIcon,
    Person as PersonIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import MegaMenu from './MegaMenu';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const { user } = useSelector((state) => state.auth);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const uniqueItemsCount = cartItems.length;

    const handleProductsHover = () => {
        if (!isMobile) {
            setShowMegaMenu(true);
        }
    };

    const handleMegaMenuClose = () => {
        setShowMegaMenu(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        handleCloseUserMenu();
        navigate('/');
    };

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const mobileMenuItems = [
        { text: 'Products', link: '/products' },
        { text: 'About Us', link: '/about' },
        { text: 'Contact', link: '/contact' },
    ];

    const renderMobileMenu = () => (
        <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    bgcolor: 'background.paper',
                    mt: '64px',
                    pt: 2,
                    zIndex: (theme) => theme.zIndex.drawer
                }
            }}
        >
            <List>
                {mobileMenuItems.map((item) => (
                    <ListItem
                        key={item.text}
                        component={RouterLink}
                        to={item.link}
                        onClick={() => setMobileMenuOpen(false)}
                        sx={{
                            color: 'text.primary',
                            textDecoration: 'none',
                            py: 1.5,
                            '&:hover': {
                                bgcolor: 'action.hover',
                            }
                        }}
                    >
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );

    useEffect(() => {
        if (!isMobile && mobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    }, [isMobile]);

    return (
        <AppBar position="fixed" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 4,
                            textDecoration: 'none',
                            color: 'text.primary',
                            '&:hover': {
                                color: 'text.primary',
                            }
                        }}
                    >
                        BC FIBER
                    </Typography>

                    {!isMobile && (
                        <>
                            <ClickAwayListener onClickAway={handleMegaMenuClose}>
                                <Box 
                                    sx={{ 
                                        position: 'relative',
                                        '&:hover': {
                                            '& > .MegaMenu': {
                                                display: 'block',
                                            }
                                        }
                                    }}
                                    onMouseEnter={handleProductsHover}
                                    onMouseLeave={handleMegaMenuClose}
                                >
                                    <Button
                                        component={RouterLink}
                                        to="/products"
                                        sx={{ 
                                            color: 'text.primary',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: 'text.primary',
                                                textDecoration: 'none'
                                            }
                                        }}
                                    >
                                        Products
                                    </Button>
                                    <Box 
                                        className="MegaMenu"
                                        sx={{ 
                                            display: showMegaMenu ? 'block' : 'none',
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                        }}
                                    >
                                        <MegaMenu onClose={handleMegaMenuClose} />
                                    </Box>
                                </Box>
                            </ClickAwayListener>
                            <Button
                                component={RouterLink}
                                to="/about"
                                sx={{ 
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'text.primary',
                                        textDecoration: 'none'
                                    }
                                }}
                            >
                                About Us
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/contact"
                                sx={{ 
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'text.primary',
                                        textDecoration: 'none'
                                    }
                                }}
                            >
                                Contact
                            </Button>
                        </>
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    <IconButton
                        component={RouterLink}
                        to="/cart"
                        sx={{ 
                            color: 'text.primary',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: 'text.primary',
                            }
                        }}
                    >
                        <Badge 
                            badgeContent={uniqueItemsCount} 
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: '#FF4444',
                                    color: 'white',
                                }
                            }}
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {user ? (
                        <>
                            <IconButton 
                                onClick={handleOpenUserMenu} 
                                sx={{ 
                                    ml: 2,
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'text.primary',
                                    }
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorElUser}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    mt: 1,
                                    '& .MuiPaper-root': {
                                        borderRadius: 2,
                                        minWidth: 180,
                                    }
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        navigate('/profile');
                                    }}
                                >
                                    Profile
                                </MenuItem>
                                {user.role === 'admin' && (
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            navigate('/admin/dashboard');
                                        }}
                                    >
                                        Dashboard
                                    </MenuItem>
                                )}
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <IconButton
                            component={RouterLink}
                            to="/login"
                            sx={{ 
                                ml: 2,
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: 'text.primary',
                                }
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                    )}

                    {isMobile && (
                        <IconButton
                            edge="end"
                            aria-label="menu"
                            onClick={handleMobileMenuToggle}
                            sx={{ 
                                ml: 2,
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: 'text.primary',
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                </Toolbar>
            </Container>
            {renderMobileMenu()}
        </AppBar>
    );
};

export default Navbar; 