import {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../axios.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";
import styles from "../AnimalFormPage/AnimalFormPage.module.scss";
import TextInputLabeled from "../../Components/TextInputLabeled/TextInputLabeled.jsx";
import TextAreaLabeled from "../../Components/TextAreaLabeled/TextAreaLabeled.jsx";
import SelectInputLabeled from "../../Components/SelectInputLabeled/SelectInputLabeled.jsx";

const TreesFormPage = () => {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('default')
    const [scientificName, setScientificName] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if (id) {
            const getTree = async () => {
                try {
                    await axios.get(`/trees/${id}?_embed=treesCategory`)
                        .then((res) => {
                            setName(res.data.name)
                            setDescription(res.data.description)
                            setSelectedCategory(res.data.category.id)
                            setScientificName(res.data.scientificName)
                            setImage(res.data.imageUrl)
                            setIsLoading(false)
                        })
                } catch (e) {
                    console.log(e)
                }
            }
            getTree()
        }
        const getCategories = async () => {
            try {
                await axios.get('/treeCategories')
                    .then((res) => {
                        setCategories(res.data)
                        setIsLoading(false)
                    })
            } catch (e) {
                console.log(e)
            }
        }
        getCategories()
    }, [id]);
    const onFormSubmitHandler = async (e) => {
        e.preventDefault()
        const tree = {
            name,
            description,
            treeCategoryId: selectedCategory,
            scientificName,
            imageUrl: image
        }
        if (id) {
            await axios.patch(`/trees/${id}`, tree)
                .then((res) => {
                    navigate(`/trees`, {state: {message: {success: `${res.data.name} edited successfully!`}}});
                })
        } else {
            await axios.post('/trees', tree)
                .then((res) => {
                    navigate(`/trees`, {state: {message: {success: `${res.data.name} created successfully!`}}});
                })
        }
    }
    return (
        <ContainerComponent>
            {isLoading ? (
                <LoadingComponent/>) : (
                <form onSubmit={(e) => {
                    onFormSubmitHandler(e)
                }}>
                    <h1 className={styles.pageTitle}>{id ? (`Editing ${name}`) : ('Creating new ')}</h1>
                    <TextInputLabeled
                        labelName='Image link'
                        id='image'
                        name='image'
                        type='text'
                        stateValue={image}
                        onStateChange={setImage}
                    />
                    <TextInputLabeled
                        labelName='Tree name'
                        id='name'
                        name='name'
                        type='text'
                        stateValue={name}
                        onStateChange={setName}
                    />
                    <TextInputLabeled
                        labelName='Tree scientific name'
                        id='scientificName'
                        name='scientificName'
                        type='text'
                        stateValue={scientificName}
                        onStateChange={setScientificName}
                    />
                    <TextAreaLabeled
                        labelName='Tree description'
                        id='description'
                        name='description'
                        stateValue={description}
                        onStateChange={setDescription}
                    />

                    <SelectInputLabeled
                        labelName='Tree categories'
                        id='categories'
                        name='categories'
                        data={categories}
                        stateValue={selectedCategory}
                        onStateChange={setSelectedCategory}
                    />
                    <button disabled={selectedCategory === 'default'}
                            className={styles.btn}> {id ? ('Save changes') : ('Create')}</button>

                </form>
            )}
        </ContainerComponent>
    )
}
export default TreesFormPage
