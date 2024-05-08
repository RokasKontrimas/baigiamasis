import styles from './TreeItem.module.scss'
import {Link} from "react-router-dom";

const TreeItem = (props) => {
    const {id, name, imageUrl, treeCategory} = props.tree
    return (
        <div className={styles.treeItem}>
            <img src={imageUrl} loading="lazy"/>
            <Link className={styles.linkCategory} to={`/trees/category/${treeCategory.id}`}>{treeCategory.name}</Link>
            <Link className={styles.linkTree} to={`/tree/${id}`}>
                <h3 className={styles.treeName}>{name}</h3>
            </Link>
        </div>
    )
}
export default TreeItem
