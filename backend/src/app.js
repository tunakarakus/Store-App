const exchangeRatesRoutes = require('./routes/exchangeRates');

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/exchange-rates', exchangeRatesRoutes); 