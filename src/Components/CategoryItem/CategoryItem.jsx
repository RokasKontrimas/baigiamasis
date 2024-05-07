import {Link} from "react-router-dom";
import styles from './CategoryItem.module.scss'
const CategoryItem = (props) => {
    const {data} = props
    const slug = data.name.toLowerCase()
    return (
        <div className={styles.wrapper} >
            <Link className={styles.categoryItem}
                to={`/category/${data.id}/${slug}`}>{data.name} ({data.animals.length})</Link>
        </div>
    )
}
export default CategoryItem
