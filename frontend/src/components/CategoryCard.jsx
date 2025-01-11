import React from 'react';
import {
    Card,
    CardContent,
    CardActionArea,
    Typography,
    Box,
} from '@mui/material';

const CategoryCard = ({ title, icon: Icon, onClick }) => {
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
            <CardActionArea 
                onClick={onClick}
                sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3
                }}
            >
                <Box sx={{ p: 2 }}>
                    {Icon && <Icon sx={{ fontSize: 60, color: 'text.primary' }} />}
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CategoryCard; 