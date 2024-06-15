import styles from './styles.module.scss';
/*
 * There are not requirement for this page,
 * so for the demo purpose some data will
 * be hardcoded for simplicity
*/
export default function Home() {
    return (
        <div>
            <div className={styles.nav}>
                <button><img src="/icons/menu-icon.png" alt="menu"></img></button>
                <span><img src="/icons/Sin ti╠ütulo-1.jpg" alt="avatar"></img></span>
            </div>
            <div className={styles.greeting}>
                <p>Hi Mr. Michael,</p>
                <p>Welcome Back!</p>
            </div>
            <div className={styles.searchbar}>
                <input placeholder='Search burger, pizza, drink, etc'></input>
            </div>
            <div className={styles.category}>
                <div>
                    <h3>Drink Category</h3>
                    <p>See All</p>
                </div>
                <div>
                    <button>All</button>
                    <button><img src="/icons/beer.png" alt="beer"/> Beer</button>
                    <button><img src="/icons/wine-glass.png" alt="wine" />Wine</button>
                </div>
            </div>
            <div className={styles.popular}>
                <div>
                    <h3>Popular</h3>
                    <p>See All</p>
                </div>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> 
            </div>
        </div>
    );
}

const DrinkCard = ({name, image, price}) => {
    return <></>
}