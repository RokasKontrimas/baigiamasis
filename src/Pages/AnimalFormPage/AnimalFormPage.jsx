import styles from './AnimalFormPage.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../../axios.jsx";
import TextInputLabeled from "../../Components/TextInputLabeled/TextInputLabeled.jsx";
import TextAreaLabeled from "../../Components/TextAreaLabeled/TextAreaLabeled.jsx";
import SelectInputLabeled from "../../Components/SelectInputLabeled/SelectInputLabeled.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import LoadingComponent from "../../Components/LoadingComponent/LoadingComponent.jsx";

const AnimalFormPage = () => {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [habitat, setHabitat] = useState('')
    const [conservationStatus, setConversationStatus] = useState('')
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('default')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if (id) {
            const getAnimal = async () => {
                try {
                    await axios.get(`/animals/${id}?_embed=category`)
                        .then((res) => {
                            setName(res.data.name)
                            setSpecies(res.data.species)
                            setHabitat(res.data.habitat)
                            setConversationStatus(res.data.conservation_status)
                            setDescription(res.data.description)
                            setSelectedCategory(res.data.category.id)
                            setImage(res.data.imageUrl)
                            setIsLoading(false)
                        })
                } catch (e) {
                    console.log(e)
                }
            }
            getAnimal()
        }
        const getCategories = async () => {
            try {
                await axios.get('/categories')
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
        const animal = {
            name,
            description,
            species,
            habitat,
            "conversation_status": conservationStatus,
            categoryId: selectedCategory,
            imageUrl: image
        }
        if (id) {
            await axios.patch(`/animals/${id}`, animal)
                .then((res) => {
                    navigate(`/animals`, {state: {message: {success: `${res.data.name} edited successfully!`}}});
                })
        } else {
            await axios.post('/animals', animal)
                .then((res) => {
                    navigate(`/animals`, {state: {message: {success: `${res.data.name} created successfully!`}}});
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
                    <>
                        {image.length > 0 && (
                            <img src={image} width="300"/>
                        )}
                    </>
                    <TextInputLabeled
                        labelName='Animal name'
                        id='name'
                        name='name'
                        type='text'
                        stateValue={name}
                        onStateChange={setName}
                    />
                    <TextAreaLabeled
                        labelName='Animal description'
                        id='description'
                        name='description'
                        stateValue={description}
                        onStateChange={setDescription}
                    />
                    <TextInputLabeled
                        labelName='Species'
                        id='species'
                        name='species'
                        type='text'
                        stateValue={species}
                        onStateChange={setSpecies}
                    />
                    <TextInputLabeled
                        labelName='Habitat'
                        id='habitat'
                        name='habitat'
                        type='text'
                        stateValue={habitat}
                        onStateChange={setHabitat}
                    />
                    <TextInputLabeled
                        labelName='Conversation status'
                        id='conversation-status'
                        name='conversation-status'
                        type='text'
                        stateValue={conservationStatus}
                        onStateChange={setConversationStatus}
                    />
                    <SelectInputLabeled
                        labelName='Animal categories'
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
export default AnimalFormPage
