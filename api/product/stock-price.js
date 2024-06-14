const stockAndPrice =  {
    10167: {
        stock: 130,
        price: 2865,
    },
    10166: {
        stock: 456,
        price: 2640,
    },
    10170: {
        stock: 6,
        price: 18100,
    },
    10035: {
        stock: 190,
        price: 2940,
    },
    10041: {
        stock: 8,
        price: 2660,
    },
    35678: {
        stock: 141,
        price: 3518,
    },
    35681: {
        stock: 12,
        price: 9900,
    },
    15337: {
        stock: 607,
        price: 3518,
    },
};

export default stockAndPrice;

const MAX_OFFSET_STOCK = 20;  // unit
const MAX_OFFSET_PRICE = 500; // cent
const INTERVAL = 5000;        // ms

function updateStockAndPrice() {
    for (const sku in stockAndPrice) {
        stockAndPrice[sku].stock += Math.floor(Math.random() * MAX_OFFSET_STOCK);
        stockAndPrice[sku].price += Math.floor(Math.random() * MAX_OFFSET_PRICE);
    }
}

setInterval(() => {
    updateStockAndPrice();
}, INTERVAL);
