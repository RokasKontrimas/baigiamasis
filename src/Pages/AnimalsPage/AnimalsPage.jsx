import {useEffect, useState} from 'react'
import axios from "../../axios.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import AnimalsListComponent from "../../Components/AnimalsListComponent/AnimalsListComponent.jsx";
import styles from './AnimalsPage.module.scss'
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import {getData} from "../../Helpers/Helpers.jsx";
import ToastMessage from "../../Components/ToastMessage/ToastMessage.jsx";
import {useLocation} from "react-router-dom";

const AnimalsPage = () => {
    const [animals, setAnimals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const location = useLocation()
    useEffect(() => {
        const fetchAnimals = async () => {
            await axios.get('/animals?_embed=category&_embed=relatedAnimals').then((res) => {
                setAnimals(res.data)
                setIsLoading(false)
            })
        }
        fetchAnimals()
    }, []);
    return (
        <ContainerComponent>
            {isLoading ? (<LoadingComponent/>) : (
                <>
                    <h1 className={styles.pageTitle}>Animals list</h1>

                    <AnimalsListComponent
                        animals={animals}
                    />
                    {location.state && (
                        <ToastMessage
                            state={location.state.message}
                        />
                    )}
                </>
            )}
        </ContainerComponent>
    )
}
export default AnimalsPage
