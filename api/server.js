import express from 'express';
import product from './product/index.js';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();

const corsOption = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOption));

// both routes are related to data from a product
// so they are put under product/ for now
app.use('/api', product);

app.listen(PORT, () => {
    console.log(`Server starts, listening on port ${PORT}`);
});