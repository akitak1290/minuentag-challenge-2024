import express from 'express';
import product from './product/index.js';

const PORT = process.env.PORT || 3000;

const app = express();

// both routes are related to data from a product
// so they are put under product/ for now
app.use('/api', product);

app.listen(PORT, () => {
    console.log(`Server starts, listening on port ${PORT}`);
});