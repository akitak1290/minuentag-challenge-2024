# Include the challenge set and answer set
The challenge set can be found under challenge/

## The e-commerce application
- A `React` frontend application serve as an online beer store.
- A `nodeJS` backend application to serve data through a rest API implemented using `expressJS`. Two API endpoints are available at the moment:
    - `/api/product/id` to get the general data about a product.
    - `/api/stock-price/code` to get the most up-to-date stock and price of a produce.

- Each applications need to be run individually:
    - do `cd /api` and do `npm start` to start the server on port 3001.
    - do `cd /ecommerce-app` and do `npm start` to start the `React` app on port 3000.

## The python script