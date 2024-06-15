import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

/*
 * There are no requirements for this page,
 * so for the demo purpose some data will
 * be hardcoded for simplicity
*/
export default function Home() {
    const url = process.env.REACT_APP_SERVER_URL ?
        process.env.REACT_APP_SERVER_URL : 'http://localhost:3001';
    const productsEndpoint = `${url}/api/products`;

    const { data, error, isLoading } = useSWR(productsEndpoint, fetcher);

    if (isLoading) return <span className={styles.loading}>Loading</span>
    if (error) return <span className={styles.loading}>Something when wrong</span>

    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <button className={styles.nav_burger}><img src="/icons/menu-icon.png" alt="menu"></img></button>
                <span className={styles.nav_avatar}><img src="/icons/Sin ti╠ütulo-1.jpg" alt="avatar"></img></span>
            </div>
            <div className={styles.greeting}>
                <p>Hi Mr. Michael,</p>
                <p>Welcome Back!</p>
            </div>
            <div className={styles.search_bar}>
                <form>
                    <input placeholder='Search burger, pizza, drink, etc'></input>
                </form>
            </div>
            <div className={styles.category}>
                <div>
                    <h3>Drink Category</h3>
                    <p className={styles.expand_link}>See All</p>
                </div>
                <div>
                    <button>All</button>
                    <button className={styles.last_pressed}>
                        <span>
                            <img src="/icons/beer.png" alt="beer" />
                        </span>
                        Beer
                    </button>
                    <button>
                        <span>
                            <img src="/icons/wine-glass.png" alt="wine" />
                        </span>
                        Wine
                    </button>
                </div>
            </div>
            <div className={styles.popular}>
                <div>
                    <h3>Popular</h3>
                    <p className={styles.expand_link}>See All</p>
                </div>
                <div className={styles.popular_cards}>
                    {data.map((product, index) =>
                        <DrinkCard id={product.id} brand={product.brand}
                            image={product.image} price="2312" />
                    )}
                </div>
            </div>
        </div>
    );
}

const DrinkCard = ({ id, brand, image, price }) => {
    const navigate = useNavigate();

    // ! missing data for Lagunitas IPA, swap for Budweiser
    // ! hardcoded for the demo
    // if (brand === "Lagunitas IPA") {
    //     brand = "Budweiser";
    //     image = "/products/budweiser.jpg";
    // }

    const redirectToProduct = (id, brand) => {
        navigate(`/${id}-${brand}`);
    }

    return (
        <div onClick={() => redirectToProduct(id, brand)} className={styles.drink_card}>
            <p>{brand}</p>
            <div className={styles.drink_card_image_container}>
                <img src={image} alt={brand} />
            </div>
            <span>
                <p>$12.45</p>
                <button onClick={(event) => event.stopPropagation()}>
                    <img src='/icons/add-cart-icon.png' alt='+'/>
                </button>
            </span>
        </div>
    );
}