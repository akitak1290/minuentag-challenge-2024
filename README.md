# Include the challenge set and answer set
The challenge set can be found under challenge/

## The e-commerce application
- A `React` frontend application serve as an online beer store.
    - `React router` for routing.
    - `SWR` as a fetch hook to simplify fetching data.
    - `Sass` for css styling.
- A `nodeJS` backend application to serve data through a rest API implemented using `expressJS`. Two API endpoints are available at the moment:
    - `/api/product/id` to get the general data about a product.
    - `/api/stock-price/code` to get the most up-to-date stock and price of a produce.

- Each applications need to be run individually:
    - do `cd /api` and do `npm start` to start the server on port 3001.
    - do `cd /ecommerce-app` and do `npm start` to start the `React` app on port 3000.

## The python script
- The answers to 5 questions are in the script


## Reflection
- [x] GitHub repository
- [x] Beer E-Commerce Challenge
	- [x] An express server to that exposes API endpoints to serve content about produces, namely price and stock
		- [x] A GET route that expects SKU code in the parameter and returns a JSON object containing the product's price and current stock count. The format is /api/stock-price/code
			- [x] We need to temporary modify the stock-price.js file for testing the 5-second update requirement (no changes to structure and functionality?) A global setInterval() function can be used to achieve this, global so that it is called when our express server import the stock-price.js module.
		- [x] A GET route that expects an ID code in the parameter and returns a JSON object containing the product's data. The format is /api/product/id.
		- Ideally, we need authentication and authorization for the server, else everyone can request access to it.
	- [x] A React web app with 2 main pages, a products page and a product detail page
		- [x] Assume a mobile-first design approach, build from the figma design (but without the native navigation bar). Then, adapt to table and desktop resolution.
		- [x] The pdp's url has the format /productId-productBrand. This means the component need to do string manipulation to parse the ID (and the brand if necessary). Assume that we will load the pdp component first and use swr or fetch and useEffect to fetch the product's data.
			- [x] After fetching the product's data, parse the result and get the SKUs code. Default to the first sku code, fetch the stock and price from /api/stock-price/code. Use setInterval() to fetch again after 5 seconds -> use useState to store the price/stock so the they are automatically updated after the fetch. 
		- [x] Prices on both the products page and the product detail pages need to be displayed in dollars with 2 decimal places. Both components will need to convert price in cents fetched from the server to the correct format.
		- [x] Assume that all the picture assets are already stored in the frontend react app because it is not a requirement where to store the photos.
		- [x] Create the home page as extra for the demo.
- [x] Python Challenge
	- [x] Follow the instructions and complete the script (5 questions).

# Some design decisions:
The data for lagunitas IPA ale doesn't exist, but there is an unused product dat for Budweiser so the frontend logic that process data will hardcode that swap for the sake of the demo.

Assume that there are a lot of other api routes, the product's urls are separated into it's own file for better organization.

Reasons to use `React`, `React Router`, and `expressJS` over `NextJS` (or other frameworks):
- Next is a powerful React framework with lots of built-in tools like routing and fetching which can replace the needs for external packages.
- However, I feel that I haven't fully understand SSR so it can get messy, and Next is overall an overkill for this assignment so I choose to stick with only React.