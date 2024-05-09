import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../../axios.jsx";
import styles from './TreePage.module.scss'
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import RelatedItemsComponent from "../../Components/RelatedItemsComponent/RelatedItemsComponent.jsx";
import {deleteItemHandler, sortData} from "../../Helpers/Helpers.jsx";
import ItemSettingsComponent from "../../Components/ItemSettingsComponent/ItemSettingsComponent.jsx";
import SettingsToggler from "../../Components/SettingsToggler/SettingsToggler.jsx";

const TreePage = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [tree, setTree] = useState('')
    const [relatedTrees, setRelatedTrees] = useState([])
    const {name, imageUrl, description, scientificName, treeCategory} = tree
    const [isToggled, setIsToggled] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const getTree = async () => {
            try {
                await axios.get(`/trees/${id}?_embed=treeCategory`)
                    .then((res) => {
                        setTree(res.data)
                        setIsLoading(false)
                    })
            } catch (e) {
                console.log(e)
            }
        }
        getTree()
    }, [id]);
    useEffect(() => {
        const getRelated = async () => {
            const data = await sortData('/relatedTrees?_embed=tree', true, true);
            setRelatedTrees(data);
        }
        getRelated();
    }, []);
    const settingsToggleHandler = (e) => {
        e.preventDefault()
        setIsToggled(prevIsToggled => !prevIsToggled);
    }
    return (
        <ContainerComponent>
            {isLoading ? (
                <LoadingComponent/>
            ) : (
                <>
                    {tree && (
                        <>
                            <div className={styles.treeWrapper}>
                                <div style={{position: "relative"}}>
                                    <h1>
                                        {name}
                                        <SettingsToggler
                                            isToggled={isToggled}
                                            handleSettingsToggle={settingsToggleHandler}
                                        />
                                    </h1>
                                </div>
                            <ItemSettingsComponent
                                isToggled={isToggled}
                                item={tree}
                                url='/trees'
                                navigate={navigate}
                                backLink='/trees'
                                editUrl={`/trees/${id}/edit`}
                            />
                                <img className={styles.treeImage} src={imageUrl}/>
                                {treeCategory.id && (
                                    <Link to={`/trees/category/${treeCategory.id}`}>{treeCategory.name}</Link>
                                )}
                                <div className={styles.treeInformation}>
                                    <p>{description}</p>
                                    <p><span>Scientific name: </span>{scientificName}</p>
                                </div>
                            </div>
                            <RelatedItemsComponent
                                data={relatedTrees}
                                url='tree'
                                title='Related trees'
                            />
                        </>
                    )}
                </>
            )}
        </ContainerComponent>
    )
}
export default TreePage
