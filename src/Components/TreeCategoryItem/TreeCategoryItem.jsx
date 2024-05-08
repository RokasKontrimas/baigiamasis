import styles from './TreeCategoryItem.module.scss'
import {Link} from "react-router-dom";

const TreeCategoryItem = (props) => {
    const {id, name,trees} = props.category
    return (
        <div className={styles.wrapper}>
        <Link className={styles.treeCategoryItem} to={`/trees/category/${id}`}>{name} ({trees.length})</Link>
        </div>
    )
}
export default TreeCategoryItem
