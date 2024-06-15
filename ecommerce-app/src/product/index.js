import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from 'swr';

import styles from './styles.module.scss';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Product() {
    const [currentSku, setCurrentSku] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [currentStock, setCurrentStock] = useState(null);
    const navigate = useNavigate();
    /* 
    * Assume that the url format is /productId-productName
    * where productName is in the format word1-word2-word3-.. 
    */
    const { productSlug } = useParams();
    const slugs = productSlug.split('-');
    const id = slugs[0];
    const brand = slugs.slice(1).map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    const url = process.env.REACT_APP_SERVER_URL ?
        process.env.REACT_APP_SERVER_URL : 'http://localhost:3001';
    const productEndpoint = `${url}/api/product/${id}`;
    // Don't fetch if id and brand are invalid
    const {
        data: productData,
        error: fetchProductError,
        isLoading: fetchProductIsLoading
    } = useSWR((id && brand) ? productEndpoint : null, fetcher);

    // Don't fetch if id, brand, and productData are invalid
    const {
        data: stockPriceData,
        error: fetchStockPriceError,
        isLoading: fetchStockPriceIsLoading
    } = useSWR((id && brand && productData) ?
        `${url}/api/stock-price/${productData.skus[currentSku].code}` : null,
        fetcher,
        {
            refreshInterval: 5000,
            shouldRetryOnError: true
        }
    );

    useEffect(() => {
        if (stockPriceData && !stockPriceData.error) {
            setCurrentPrice(stockPriceData.price);
            setCurrentStock(stockPriceData.stock);
        }
    }, [stockPriceData]);

    // ! can potentially add handlers for this
    if (!id || !brand) return <span className={styles.loading}>No product found</span>
    if (fetchProductIsLoading || fetchStockPriceIsLoading) return <span className={styles.loading}>Loading</span>
    if (fetchProductError || fetchStockPriceError ||
        productData.error || stockPriceData.error)
        return <span className={styles.loading}>Something went wrong</span>

    const selectSku = (index) => {
        setCurrentSku(index);
    };

    return (
        <div className={styles.container}>
            <div className={styles.nav_desktop}>
                <span onClick={() => navigate('/')}>products</span>/product/{brand}
            </div>
            <div className={styles.nav}>
                <button onClick={() => navigate('/')}>
                    <img src="/icons/icon-back.png" alt="back" />
                </button>
                <h4>Detail</h4>
                <button><img src="/icons/icon-dots.png" alt="menu" /></button>
            </div>
            <div className={styles.product_image_container}>
                <img src={productData.image} alt='beer' />
            </div>
            <div className={styles.product_info_container}>
                <div className={styles.product_info_heading}>
                    <div>
                        <h2>{brand}</h2>
                        <h2 className={styles.price}>${(parseInt(currentPrice) / 100).toFixed(2)}</h2>
                    </div>
                    <p>Origin: {productData.origin} &nbsp;|&nbsp; Stock: {currentStock}</p>
                </div>
                <div>
                    <h4>Description</h4>
                    <TruncatedText text={productData.information} maxLength={189} />
                </div>
                <div>
                    <h4>Size</h4>
                    <div className={styles.size_buttons_container}>
                        {productData.skus.map((sku, index) =>
                            <button
                                key={index}
                                className={`${currentSku === index ? styles.last_pressed : ''}`}
                                onClick={() => selectSku(index)}>
                                {sku.name}
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.product_info_submit}>
                    <button><img src="/icons/icon-bag.png" alt="bag icon" /></button>
                    <button>Add to cart</button>
                </div>

            </div>
        </div>
    );
}

const TruncatedText = ({ text, maxLength }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    return (
        <div>
            <p>
                {isTruncated ? `${text.slice(0, maxLength)} ... ` : `${text} `}
                {text.length > maxLength && (
                    <span onClick={toggleTruncate} className={styles["truncate-span"]}>
                        <b>
                            {isTruncated ? 'Read more' : 'Show less'}
                        </b>
                    </span>
                )}
            </p>
        </div>
    );
}