import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from './WelcomePage.module.scss'
import {Link} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import axios from "../../axios.jsx";

const WelcomePage = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get('/categories').then((res) => {
            setCategories(res.data);
        });
    }, []);
    return (
        <div>
            <div className={styles.wrapper}>
                <Carousel
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    useKeyboardArrows={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={2000}
                >
                    <div>
                        <img src='https://i.redd.it/j8kusb4560f01.jpg'/>
                    </div>
                    <div>
                        <img src='https://w.wallhaven.cc/full/01/wallhaven-01jrpg.jpg'/>
                    </div>
                    <div>
                        <img src='https://images.alphacoders.com/111/1114615.jpg'/>
                    </div>
                    <div>
                        <img src='https://s1.1zoom.me/b4140/75/Foxes_Snow_549021_1920x1080.jpg'/>
                    </div>
                    <div>
                        <img src='https://wallpapers.com/images/featured/brown-bear-emdhkrd5ot16t2pw.jpg'/>
                    </div>
                </Carousel>
                <h1 className={styles.pageTitle}>Welcome to wild life!</h1>
                <Link className={styles.btn} to='/animals'>Start journey</Link>

            </div>
            <h1 className={`text-3xl font-bold underline  ${styles.subTitle}`}>Animal categories</h1>
            <div className={styles.categoriesWrapper}>
                {categories.map((category) => {
                    return <Fragment key={category.id}>
                        {category.name.length > 0 && (
                            <Link className={styles.categoryItem}
                                  to={`/animals/category/${category.id}`}>
                                {category.name}
                            </Link>
                        )}
                    </Fragment>
                })}
            </div>
        </div>
    )
}
export default WelcomePage
