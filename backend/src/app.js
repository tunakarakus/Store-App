const exchangeRatesRoutes = require('./routes/exchangeRates');
const customPriceRoutes = require('./routes/customPriceRoutes');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/custom-prices', customPriceRoutes);
app.use('/api/exchange-rates', exchangeRatesRoutes); 