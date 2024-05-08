import TreeCategoryItem from "../TreeCategoryItem/TreeCategoryItem.jsx";
import styles from './TreesCategoriesList.module.scss'
const TreeCategoriesList = ({categories}) => {
    return (
        <div className={styles.treeCategoriesWrapper}>
            {categories.map((category) => {
                return <TreeCategoryItem
                    key={category.id}
                    category={category}
                />
            })}
        </div>
    )
}
export default TreeCategoriesList
