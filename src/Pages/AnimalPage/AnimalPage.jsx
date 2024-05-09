import styles from './AnimalPage.module.scss'
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import RelatedItemsComponent from "../../Components/RelatedItemsComponent/RelatedItemsComponent.jsx";
import {sortData} from "../../Helpers/Helpers.jsx";
import ItemSettingsComponent from "../../Components/ItemSettingsComponent/ItemSettingsComponent.jsx";
import SettingsToggler from "../../Components/SettingsToggler/SettingsToggler.jsx";

const AnimalPage = () => {
    const [animal, setAnimal] = useState('')
    const [category, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isToggled, setIsToggled] = useState(false)
    const [relatedAnimals, setRelatedAnimals] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    const {name, species, imageUrl, habitat, conservation_status, description, categoryId} = animal

    useEffect(() => {
        const getRelated = async () => {
            const data = await sortData('/relatedAnimals?_embed=animal', true, true);
            setRelatedAnimals(data);
        }
        getRelated();
    }, []);

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
    const settingsToggleHandler = (e) => {
        e.preventDefault()
        setIsToggled(prevIsToggled => !prevIsToggled);
    }
    return (
        <ContainerComponent>
            {isLoading ? (<LoadingComponent/>) : (
                <>
                    <div className={styles.animalWrapper}>
                        <div style={{position: "relative"}}>
                            <h1 className={styles.animalName}>
                                {name}
                                <SettingsToggler
                                    handleSettingsToggle={settingsToggleHandler}
                                    isToggled={isToggled}
                                />
                            </h1>
                        </div>
                        <ItemSettingsComponent
                            isToggled={isToggled}
                            url='/animals'
                            item={animal}
                            navigate={navigate}
                            backLink='/trees/categories'
                        />
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
