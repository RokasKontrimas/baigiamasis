import {useEffect, useState} from 'react'
import axios from "../../axios.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import TreeCategoriesList from "../../Components/TreesCategoriesList/TreeCategoriesList.jsx";
import styles from './TreeCategoriesPage.module.scss'
const TreeCategoriesPage = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getCategories = async () => {
            try {
                await axios.get('/treeCategories?_embed=trees')
                    .then((res) => {
                        setCategories(res.data)
                        setIsLoading(false)
                    })
            } catch (e) {
                console.log(e)
            }
        }
        getCategories()
    }, []);
    return (
        <ContainerComponent>
            {isLoading ? (
                <LoadingComponent/>
            ) : (
                <>
                    <h1 className={styles.pageTitle}>Tree categories</h1>
                    <TreeCategoriesList
                        categories={categories}
                    />
                </>
            )}

        </ContainerComponent>
    )
}
export default TreeCategoriesPage
