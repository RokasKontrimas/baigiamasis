import React from 'react'
import styles from "./RelatedItemsComponent.module.scss"
import {Link} from "react-router-dom";

const RelatedItemsComponent = (props) => {
    const {title, data, url} = props
    return (
        <div className={styles.relatedDataWrapper}>
            <h2 className={styles.pageTitle}>{title}</h2>
            <div className={styles.relatedData}>
                {data.map((item) => {
                    return <Link className={styles.relatedDataItem} key={item.id} to={`/${url}/${item.id}`}>
                        <img src={item.imageUrl} width='300'/>
                    </Link>
                })}
            </div>
        </div>
    )
}
export default RelatedItemsComponent
