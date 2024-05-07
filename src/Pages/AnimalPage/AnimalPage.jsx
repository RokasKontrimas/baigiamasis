import styles from './AnimalPage.module.scss'
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../../axios.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import RelatedItemsComponent from "../../Components/RelatedItemsComponent/RelatedItemsComponent.jsx";

const AnimalPage = () => {
    const [animal, setAnimal] = useState('')
    const [category, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [relatedAnimals, setRelatedAnimals] = useState([])
    const {id} = useParams()

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const response = await axios.get(`/animals/${id}?_embed=category`);
                setAnimal(response.data);
                setCategory(response.data.category);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching animal:", error);
            }
        };

        fetchAnimal();
    }, [id]);

    useEffect(() => {
        if (category.id) {
            const getRelatedAnimals = async () => {
                try {
                    const response = await axios.get(`/animals?categoryId=${category.id}`);
                    const allAnimals = response.data;

                    // Shuffle the array to ensure random selection
                    const shuffledAnimals = shuffleArray(allAnimals);


                    setRelatedAnimals(shuffledAnimals.splice(0,3));
                } catch (error) {
                    console.error("Error fetching related animals:", error);
                }
            };

            getRelatedAnimals();
        }
    }, [category.id,id]);

    const shuffleArray = (array) => {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };


    const {name, species, imageUrl, habitat, conservation_status, description, categoryId} = animal
    return (
        <ContainerComponent>
            {isLoading ? (<LoadingComponent/>) : (
                <>
                    <div className={styles.animalWrapper}>
                        <h1 className={styles.animalName}>{name}</h1>
                        <img className={styles.animalImage} src={imageUrl}/>
                        <Link to={`/category/${categoryId}`}>{category.name}</Link>
                        <div className={styles.animalInformation}>
                            <p className={styles.animalDescription}>{description}</p>
                            <p className={styles.animalSpecies}><span>Species: </span>{species}</p>
                            <p className={styles.animalHabitat}><span>Habitat:</span> {habitat}</p>
                            <p className={styles.animalConservation}>
                                <span>Conservation status: </span>
                                {Array.isArray(conservation_status) ? (conservation_status.join(',')) : (conservation_status)}
                            </p>
                        </div>
                    </div>
                    {relatedAnimals.length > 0 && (
                <RelatedItemsComponent
                    data={relatedAnimals}
                    url='animal'
                    title='Related animals'
                />
                    )}
                </>

            )}
        </ContainerComponent>
    )
}
export default AnimalPage
