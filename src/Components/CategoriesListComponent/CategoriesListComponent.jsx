import CategoryItem from "../CategoryItem/CategoryItem.jsx";
import styles from './CategoriesListComponent.module.scss'

const CategoriesListComponent = (props) => {
    const {categories} = props
    return (
        <div className={styles.categoriesList}>
            {categories.map((category) => {
                return <CategoryItem
                    key={category.id}
                    data={category}
                />
            })}
        </div>
    )
}
export default CategoriesListComponent
