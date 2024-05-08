import styles from "./RelatedItemsComponent.module.scss"
import {Link} from "react-router-dom";

const RelatedItemsComponent = (props) => {
    const {title, data, url} = props

    return (
        <div className={styles.relatedDataWrapper}>
            <h2 className={styles.pageTitle}>{title}</h2>
            <div className={styles.relatedData}>
                {data.map((item,index) => {
                    return <Link className={styles.relatedDataItem} key={index} to={`/${url}/${item[url].id}`}>
                            <img src={item[url].imageUrl} width='300'/>
                    </Link>
                })}
            </div>
        </div>
    )
}
export default RelatedItemsComponent
