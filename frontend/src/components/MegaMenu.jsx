import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    Cable as CableIcon,
    Router as RouterIcon,
    Wifi as WifiIcon,
    Devices as DevicesIcon,
    Build as BuildIcon,
    Storage as StorageIcon,
    Speed as SpeedIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const categories = {
    'Fiber Optic Products': {
        icon: CableIcon,
        subcategories: [
            { title: 'Adapters', icon: DevicesIcon },
            { title: 'Drop Cables', icon: CableIcon },
            { title: 'Connectors', icon: BuildIcon },
            { title: 'Patch Cords', icon: CableIcon },
            { title: 'Pigtails', icon: CableIcon },
            { title: 'Splitters', icon: StorageIcon },
            { title: 'Attenuators', icon: SpeedIcon },
        ],
    },
    'Copper Products': {
        icon: RouterIcon,
        subcategories: [
            { title: 'Copper Cables', icon: CableIcon },
            { title: 'Copper Patch Cords', icon: CableIcon },
            { title: 'Copper Patch Panels', icon: StorageIcon },
            { title: 'Face Plates', icon: DevicesIcon },
            { title: 'Keystone Jacks', icon: BuildIcon },
        ],
    },
    'FTTH/GPON Products': {
        icon: WifiIcon,
        subcategories: [
            { title: 'Wall Mount Panels', icon: StorageIcon },
            { title: 'Rack Mount Panels', icon: StorageIcon },
            { title: 'Splice Closures', icon: DevicesIcon },
        ],
    },
};

const MegaMenu = ({ onClose }) => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        onClose();
        navigate(`/products?category=${encodeURIComponent(category)}`);
    };

    const handleSubcategoryClick = (category, subcategory) => {
        onClose();
        navigate(`/products?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`);
    };

    return (
        <Paper 
            elevation={1}
            sx={{
                position: 'absolute',
                top: '100%',
                left: -24,
                right: -24,
                zIndex: 1300,
                mt: 0.5,
                py: 2,
                px: 3,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                minWidth: '800px',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Grid container spacing={3}>
                {Object.entries(categories).map(([category, { icon: Icon, subcategories }]) => (
                    <Grid item xs={12} md={4} key={category}>
                        <Box 
                            onClick={() => handleCategoryClick(category)}
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: 1.5,
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'primary.main',
                                }
                            }}
                        >
                            <Icon sx={{ mr: 1, fontSize: 20, color: 'text.primary' }} />
                            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
                                {category}
                            </Typography>
                        </Box>
                        <List dense sx={{ ml: 3 }}>
                            {subcategories.map((sub) => (
                                <ListItem 
                                    key={sub.title}
                                    onClick={() => handleSubcategoryClick(category, sub.title)}
                                    sx={{ 
                                        py: 0.5,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: 'primary.main',
                                            backgroundColor: 'transparent',
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{ 
                                            fontWeight: 400,
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {sub.title}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                ))}
            </Grid>
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    mt: 2,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography
                    component={RouterLink}
                    to="/products?view=all"
                    onClick={() => {
                        onClose();
                    }}
                    sx={{ 
                        color: 'text.primary',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        '&:hover': {
                            color: 'primary.main',
                        }
                    }}
                >
                    View All Products →
                </Typography>
            </Box>
        </Paper>
    );
};

export default MegaMenu; 