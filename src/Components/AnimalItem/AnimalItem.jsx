import styles from './AnimalItem.module.scss'
import {Link} from "react-router-dom";

const AnimalItem = (props) => {
    const {id, name, species, imageUrl, habitat, categoryId} = props.animal
    return (
        <div className={styles.animalItem}>
            <img src={imageUrl} loading="lazy"/>
            <Link className={styles.linkCategory} to={`/category/${categoryId}`}>{props.animal.category.name}</Link>
            <Link className={styles.linkAnimal} to={`/animal/${id}`}>
                <h1 className={styles.animalName}>{name}</h1>
                <h3 className={styles.animalSpecies}>{species}</h3>
                <h4 className={styles.animalHabitat}>{habitat}</h4>
            </Link>
        </div>
    )
}
export default AnimalItem
