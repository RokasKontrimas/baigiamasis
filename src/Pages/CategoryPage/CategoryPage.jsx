import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../../axios.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import {Carousel} from "react-responsive-carousel";
import styles from './CategoryPage.module.scss';
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";

const CategoryPage = () => {
    const {id} = useParams();
    const [animals, setAnimals] = useState([]);
    const [newAnimals, setNewAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/animals?categoryId=${id}`);
                const categoryRes = await axios.get(`/categories/${id}`);
                setAnimals(response.data);
                setSelectedCategory(categoryRes.data)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [id]);

    useEffect(() => {
        if (animals.length > 3) {
            const tempNewAnimals = [];
            const selectedIndexes = [];

            while (tempNewAnimals.length < 3) {
                const randomIndex = Math.floor(Math.random() * animals.length);

                // Check if the random index has been selected before
                if (!selectedIndexes.includes(randomIndex)) {
                    tempNewAnimals.push(animals[randomIndex]);
                    selectedIndexes.push(randomIndex);
                }
            }

            setNewAnimals(tempNewAnimals);
        } else {
            setNewAnimals([]);
        }
    }, [animals]);



    return (
        <>
            {isLoading ? (
                <LoadingComponent/>
            ) : (
                <>
                    <h1 className={styles.pageTitle}>{selectedCategory.name}</h1>
                    <p className={styles.description}>{selectedCategory.description}</p>
                    {animals && (
                        <Carousel
                            showArrows={false}
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                            useKeyboardArrows={false}
                            infiniteLoop={true}
                            autoPlay={true}
                        >
                            {newAnimals.length > 0 ? (
                                newAnimals.map((animal, index) => (
                                    <div key={index}>
                                        <img src={animal.imageUrl} alt={animal.name} loading="lazy"/>
                                    </div>
                                ))
                            ) : (
                                animals.map((animal) => (
                                    <div key={animal.id}>
                                        <img src={animal.imageUrl} alt={animal.name} loading="lazy"/>
                                    </div>
                                ))
                            )}
                        </Carousel>
                    )}

                    <ContainerComponent>
                        <h2 className={styles.pageTitle}>Listed animals
                            in {selectedCategory.name} category</h2>
                        <div className={styles.animalWrapper}>
                            {animals.map((animal) => {
                                return <div className={styles.animalItem} key={animal.id}>
                                    <img src={animal.imageUrl}/>
                                    <Link to={`/animal/${animal.id}`}>
                                        <span>{animal.species}</span>
                                        <h3>{animal.name}</h3>
                                    </Link>
                                </div>
                            })}
                        </div>
                    </ContainerComponent>

                </>
            )}
        </>
    );
};

export default CategoryPage;
