import express from 'express';
import products from './products.js';
import stockPrice from './stock-price.js';

const router = express.Router();

/*
 * Get stock and price data for the product
 * with sku params.code
*/
router.get('/stock-price/:code', (req, res) => {
    const sku = parseInt(req.params.code);

    if (!stockPrice.hasOwnProperty(sku)) {
        return res.status(404).json({ error: 'Resource not found.' });
    }

    res.json(stockPrice[sku]);
});

/*
 * Get data about the product with id params.code
*/
router.get('/product/:code', (req, res) => {
    const id = parseInt(req.params.code);
    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({ error: 'Resource not found.' });
    }

    res.json(product);
});

export default router;