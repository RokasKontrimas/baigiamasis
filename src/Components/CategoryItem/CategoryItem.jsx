import {Link} from "react-router-dom";
import styles from './CategoryItem.module.scss'
const CategoryItem = (props) => {
    const {data} = props
    return (
        <div className={styles.wrapper} >
            <Link className={styles.categoryItem}
                to={`/category/${data.id}`}>{data.name} ({data.animals.length})</Link>
        </div>
    )
}
export default CategoryItem
