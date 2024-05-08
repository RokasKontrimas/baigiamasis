import {useEffect, useState} from 'react'
import axios from "../../axios.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import AnimalsListComponent from "../../Components/AnimalsListComponent/AnimalsListComponent.jsx";
import styles from './AnimalsPage.module.scss'
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import {getData} from "../../Helpers/Helpers.jsx";

const AnimalsPage = () => {
    const [animals, setAnimals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const animalsData = await getData('animals');
                console.log(animalsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);
    useEffect(() => {
        const fetchAnimals = async () => {
            await axios.get('/animals?_embed=category').then((res) => {
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
                </>
            )}
        </ContainerComponent>
    )
}
export default AnimalsPage
