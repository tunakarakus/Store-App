import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    Grid,
    Paper,
    Link,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contact = () => {
    const [selectedCountry, setSelectedCountry] = useState('USA');

    const offices = {
        TURKEY: {
            city: 'Istanbul',
            flag: '🇹🇷',
            company: 'BC FIBER TURKEY',
            isHeadOffice: true,
            contacts: {
                address: 'Halkalı Merkez Mahallesi Dereboyu Caddesi No:4 Kat:1 Kucukcekmece / ISTANBUL / Turkiye',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+90 212 709 32 02'
                },
                sales: {
                    email: 'info@bcfiber.com',
                    phone: '+90 212 709 32 02'
                },
                fax: '+90 212 709 32 04'
            }
        },
        USA: {
            city: 'New Jersey',
            flag: '🇺🇸',
            company: 'BC FIBER USA INC.',
            contacts: {
                address: '121 B MEADOW St. HACKENSACK NJ 07601',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+1 2014889444 - 45'
                },
                sales: {
                    email: 'SalesUSA@bcfiber.com',
                    phone: '+1 2016914495'
                }
            }
        },
        FRANCE: {
            city: 'Paris',
            flag: '🇫🇷',
            company: 'BC FIBER FRANCE SAS',
            contacts: {
                address: '88, AVENUE DE L\'EUROPE 77184 EMERAINVILLE',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+33 631429995'
                },
                sales: {
                    email: 'SalesFR@bcfiber.com',
                    phone: '+33 631429995'
                }
            }
        },
        SPAIN: {
            city: 'Barcelona',
            flag: '🇪🇸',
            company: 'BC FIBER SPAIN SL',
            contacts: {
                address: 'CARRER DE COBALT,16-20 NAU C 08038 BARCELONA B66200577',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+34 936398918'
                },
                sales: {
                    email: 'SalesES@bcfiber.com',
                    phone: '+34 651888053'
                }
            }
        },
        ITALY: {
            city: 'Turin',
            flag: '🇮🇹',
            company: 'BC FIBER ITALY SRL',
            contacts: {
                address: 'STRADA DEL CASCINOTTO 156 - 10156',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+39 011 0120383'
                },
                sales: {
                    email: 'SalesIT@bcfiber.com',
                    phone: '+39 3401202148'
                }
            }
        },
        GERMANY: {
            city: 'Dusseldorf',
            flag: '🇩🇪',
            company: 'BC Fiber Germany GmbH',
            contacts: {
                address: 'Heinrichstraße 73, 40239,',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+49 162868988'
                },
                sales: {
                    email: 'SalesDE@bcfiber.com',
                    phone: '+49 162868988'
                }
            }
        },
        RUSSIA: {
            city: 'Moscow',
            flag: '🇷🇺',
            company: 'BC FIBER MSK CO.LTD',
            contacts: {
                address: '141044, RUSSIA, MOSCOW REGION, MYTISCHI, GRIBKI VILLAGE, DMITROV HIGHWAY 48G',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+7 968688167'
                },
                sales: {
                    email: 'SalesRU@bcfiber.com',
                    phone: '+7 968688167'
                }
            }
        },
        KAZAKHSTAN: {
            city: 'Almaty',
            flag: '🇰🇿',
            company: 'BC Fiber LLP',
            contacts: {
                address: 'Ryskulov Ave 140/4, Business Centre Nurly Turan Office : 511 050061',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+7 7777220791'
                },
                sales: {
                    email: 'maksat.atayev@bcfiber.com',
                    phone: '+7 7777220791'
                }
            }
        },
        VIETNAM: {
            city: 'Ho Chi Minh City',
            flag: '🇻🇳',
            company: 'VIET FIBER CO., LTD',
            contacts: {
                address: 'LOT K02 LONG HAU STREET, LONG HAU IP, CAN GIUOC, LONG AN (ZIP CODE : 850000)',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+84 2838734859'
                },
                sales: {
                    email: 'SalesVN@bcfiber.com',
                    phone: '+84 985178317'
                }
            }
        },
        CHINA: {
            city: 'Shenzhen',
            flag: '🇨🇳',
            company: 'SHENZHEN B AND C FIBER TECHNOLOGY LIMITED',
            contacts: {
                address: '2/F, BLOCK A, NO.5 HUATING ROAD, TONGSHENG COMMUNITY, DALANG STREET, LONGHUA DISTRICT, 518000',
                general: {
                    email: 'info@bcfiber.com',
                    phone: '+86 755 2361 5515'
                },
                sales: {
                    email: 'SalesCN@bcfiber.com',
                    phone: '+86 136 7027 5731'
                }
            }
        }
    };

    const countryOrder = ['USA', 'FRANCE', 'SPAIN', 'ITALY', 'GERMANY', 'RUSSIA', 'KAZAKHSTAN', 'VIETNAM', 'CHINA'];

    const handleCountryChange = (event, newValue) => {
        setSelectedCountry(newValue);
    };

    const selectedOffice = offices[selectedCountry];

    return (
        <Container maxWidth={false}>
            {/* Hero Section */}
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
                        align="center"
                        sx={{ 
                            mb: 2,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                        }}
                    >
                        Contact Us
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mb: 8 }}>
                {/* Country Tabs */}
                <Box sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider', 
                    mb: 4
                }}>
                    {/* Other Countries */}
                    <Tabs
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            '& .MuiTab-root': {
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:focus': {
                                    outline: 'none',
                                },
                                '&.Mui-focusVisible': {
                                    outline: 'none',
                                },
                            },
                            '& .Mui-selected': {
                                color: '#c41e3a !important',
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#c41e3a',
                            }
                        }}
                    >
                        {countryOrder.map((country) => (
                            <Tab
                                key={country}
                                label={country}
                                value={country}
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Office Details */}
                <Grid container spacing={4}>
                    {/* Selected Country Info */}
                    <Grid item xs={12} md={6}>
                        {selectedCountry !== 'TURKEY' && (
                            <>
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h4" gutterBottom>
                                        {selectedOffice.city}, {selectedCountry}
                                    </Typography>
                                    {selectedOffice.company && (
                                        <Typography variant="h6" gutterBottom>
                                            {selectedOffice.company}
                                        </Typography>
                                    )}
                                    <Typography variant="body1" paragraph>
                                        {selectedOffice.contacts.address}
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        GENERAL
                                    </Typography>
                                    <Typography variant="body1">
                                        Email: {selectedOffice.contacts.general.email}
                                    </Typography>
                                    <Typography variant="body1">
                                        Phone: {selectedOffice.contacts.general.phone}
                                    </Typography>
                                </Box>

                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="h6" gutterBottom>
                                        SALES
                                    </Typography>
                                    <Typography variant="body1">
                                        Email: {selectedOffice.contacts.sales.email}
                                    </Typography>
                                    <Typography variant="body1">
                                        Phone: {selectedOffice.contacts.sales.phone}
                                    </Typography>
                                </Box>

                                {selectedOffice.contacts.fax && (
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="body1">
                                            Fax: {selectedOffice.contacts.fax}
                                        </Typography>
                                    </Box>
                                )}
                            </>
                        )}
                    </Grid>

                    {/* Turkey Head Office Info - Always Visible */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ 
                            p: 3, 
                            bgcolor: 'rgba(0, 0, 0, 0.02)', 
                            borderRadius: 2,
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                        }}>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h4" gutterBottom>
                                    Istanbul, TURKEY
                                </Typography>
                                <Typography variant="h5" gutterBottom sx={{ color: '#c41e3a' }}>
                                    HEAD OFFICE
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    BC FIBER TURKEY
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {offices.TURKEY.contacts.address}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" gutterBottom>
                                    GENERAL
                                </Typography>
                                <Typography variant="body1">
                                    Email: {offices.TURKEY.contacts.general.email}
                                </Typography>
                                <Typography variant="body1">
                                    Phone: {offices.TURKEY.contacts.general.phone}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h6" gutterBottom>
                                    SALES
                                </Typography>
                                <Typography variant="body1">
                                    Email: {offices.TURKEY.contacts.sales.email}
                                </Typography>
                                <Typography variant="body1">
                                    Phone: {offices.TURKEY.contacts.sales.phone}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="body1">
                                    Fax: {offices.TURKEY.contacts.fax}
                                </Typography>
                            </Box>

                            {/* Social Media Links */}
                            <Box sx={{ mt: 4 }}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Link 
                                            href="#" 
                                        sx={{
                                                color: 'text.primary',
                                                '&:hover': {
                                                    color: 'text.primary'
                                                }
                                            }}
                                        >
                                            <FacebookIcon />
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link 
                                            href="#" 
                                            sx={{
                                                color: 'text.primary',
                                                '&:hover': {
                                                    color: 'text.primary'
                                                }
                                            }}
                                        >
                                            <TwitterIcon />
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link 
                                            href="#" 
                                            sx={{ 
                                                color: 'text.primary',
                                                '&:hover': {
                                                    color: 'text.primary'
                                                }
                                            }}
                                        >
                                            <LinkedInIcon />
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link 
                                            href="#" 
                                            sx={{ 
                                                color: 'text.primary',
                                                '&:hover': {
                                                    color: 'text.primary'
                                                }
                                            }}
                                        >
                                            <YouTubeIcon />
                                        </Link>
                                </Grid>
                                    <Grid item>
                                        <Link 
                                            href="#" 
                                            sx={{ 
                                                color: 'text.primary',
                                                '&:hover': {
                                                    color: 'text.primary'
                                                }
                                            }}
                                        >
                                            <InstagramIcon />
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
};

export default Contact; 