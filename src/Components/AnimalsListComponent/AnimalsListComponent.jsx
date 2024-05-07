import AnimalItem from "../AnimalItem/AnimalItem.jsx";
import styles from './AnimalsListComponent.module.scss'

const AnimalsListComponent = (props) => {
    const {animals} = props
    return (
        <div className={styles.animalsWrapper}>
            {animals.map((animal) => {
                return <AnimalItem
                    key={animal.id}
                    animal={animal}
                />
            })}
        </div>
    )
}
export default AnimalsListComponent
