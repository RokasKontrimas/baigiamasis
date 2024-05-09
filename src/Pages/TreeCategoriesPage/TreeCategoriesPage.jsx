import {useEffect, useState} from 'react'
import axios from "../../axios.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import TreeCategoriesList from "../../Components/TreesCategoriesList/TreeCategoriesList.jsx";
import styles from './TreeCategoriesPage.module.scss'
import ToastMessage from "../../Components/ToastMessage/ToastMessage.jsx";
import {useLocation} from "react-router-dom";

const TreeCategoriesPage = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()

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
            {location.state && (
                <ToastMessage
                    state={location.state.message}
                />
            )}
        </ContainerComponent>
    )
}
export default TreeCategoriesPage
