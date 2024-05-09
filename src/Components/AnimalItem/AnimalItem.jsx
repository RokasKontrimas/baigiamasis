import styles from './AnimalItem.module.scss'
import {Link} from "react-router-dom";
import axios from "../../axios.jsx";

const AnimalItem = (props) => {


    const {id, name, species, imageUrl, habitat, categoryId,relatedAnimals} = props.animal
    const handleLinkClick = async () => {
        try {
            await axios.patch(`/relatedAnimals/${relatedAnimals[0].id}`, {
                counter: Number(relatedAnimals[0].counter) + 1
            })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={styles.animalItem}>
            <img src={imageUrl} loading="lazy"/>
            <Link className={styles.linkCategory}
                  to={`/animals/category/${categoryId}`}>{props.animal.category.name}</Link>
            <Link
                onClick={() => handleLinkClick()
                }
                className={styles.linkAnimal} to={`/animal/${id}`}>
                <h1 className={styles.animalName}>{name}</h1>
                <h3 className={styles.animalSpecies}>{species}</h3>
                <h4 className={styles.animalHabitat}>{habitat}</h4>
            </Link>
        </div>
    )
}
export default AnimalItem
