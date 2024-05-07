import React, {useEffect, useState} from 'react'
import axios from "../../axios.jsx";
import styles from './CategoriesPage.module.scss'
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import CategoriesListComponent from "../../Components/CategoriesListComponent/CategoriesListComponent.jsx";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get('/categories?_embed=animals').then((res) => {
            setCategories(res.data)
            setIsLoading(false)
        })
    }, []);
    return (
        <ContainerComponent>
            {isLoading ? (
                <LoadingComponent/>
            ) : (
                <>
                    <h1 className={styles.pageTitle}>Animal categories</h1>
                    {categories && (
                        <CategoriesListComponent
                            categories={categories}
                        />
                    )}
                </>
            )
            }

        </ContainerComponent>
    )
}
export default CategoriesPage
