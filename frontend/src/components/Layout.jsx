import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            width: '100vw',
            maxWidth: '100vw',
            overflowX: 'hidden',
            bgcolor: 'background.default',
            position: 'relative'
        }}>
            <Navbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: '100vw',
                    maxWidth: '100vw',
                    mt: '64px', // Height of the navbar
                    position: 'relative'
                }}
            >
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout; 