import {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import axios from "../../axios.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import styles from './TreeCategoryPage.module.scss'
import {Carousel} from "react-responsive-carousel";

const TreeCategoryPage = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState('');
    const [trees, setTrees] = useState([])
    const [newTrees, setNewTrees] = useState([])
    useEffect(() => {
        const getCategory = async () => {
            try {
                await axios.get(`/treeCategories/${id}?_embed=trees`)
                    .then((res) => {
                        setCategory(res.data)
                        setTrees(res.data.trees)
                        setIsLoading(false)
                    })
            } catch (e) {
                console.log(e)
            }
        }
        getCategory()
    }, [id]);

    useEffect(() => {
        if (trees.length > 3) {
            const tempNewTrees = [];
            const selectedIndexes = [];

            while (tempNewTrees.length < 3) {
                const randomIndex = Math.floor(Math.random() * trees.length);

                // Check if the random index has been selected before
                if (!selectedIndexes.includes(randomIndex)) {
                    tempNewTrees.push(trees[randomIndex]);
                    selectedIndexes.push(randomIndex);
                }
            }

            setNewTrees(tempNewTrees);
        } else {
            setNewTrees([]);
        }
    }, [trees]);
    return (
        <>
            {isLoading ? (
                <LoadingComponent/>
            ) : (
                <div>
                    <div className={styles.pageIntro}>
                        <h1>{category.name}</h1>
                        <p>{category.description}</p>
                    </div>
                    <Carousel
                        showArrows={false}
                        showStatus={false}
                        showIndicators={false}
                        showThumbs={false}
                        useKeyboardArrows={false}
                        infiniteLoop={true}
                        autoPlay={true}
                    >
                        {newTrees.length > 0 ? (
                            newTrees.map((tree, index) => (
                                <div key={index}>
                                    <img src={tree.imageUrl} alt={tree.name} loading="lazy"/>
                                </div>
                            ))
                        ) : (
                            trees.map((tree) => (
                                <div key={tree.id}>
                                    <img src={tree.imageUrl} alt={tree.name} loading="lazy"/>
                                </div>
                            ))
                        )}
                    </Carousel>
                    <ContainerComponent>
                        <h2 className={styles.pageSubtitle}>Listed trees in {category.name}</h2>
                        <div className={styles.treeWrapper}>
                            {trees.map((tree) => {
                                return <div className={styles.treeItem} key={tree.id}>
                                    <img src={tree.imageUrl}/>
                                    <Link to={`/tree/${tree.id}`}>
                                        <span>{tree.scientificName}</span>
                                        <h3>{tree.name}</h3>
                                    </Link>
                                </div>
                            })}
                        </div>
                    </ContainerComponent>
                </div>

            )}
        </>

    )
}
export default TreeCategoryPage
