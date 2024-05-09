import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../axios.jsx";
import TextInputLabeled from "../../Components/TextInputLabeled/TextInputLabeled.jsx";
import TextAreaLabeled from "../../Components/TextAreaLabeled/TextAreaLabeled.jsx";
import ContainerComponent from "../../Components/ContainerComponent/ContainerComponent.jsx";
import styles from './TreeCategoryFormPage.module.scss'

const TreeCategoryFormPage = () => {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            const getTree = async () => {
                try {
                    await axios.get(`/treeCategories/${id}`)
                        .then((res) => {
                            setName(res.data.name)
                            setDescription(res.data.description)
                        })
                } catch (e) {
                    console.log(e)
                }
            }
            getTree()
        }
    }, [id]);
    const onFormSubmitHandler = async (e) => {
        e.preventDefault()
        if (id) {
            await axios.patch(`/treeCategories/${id}`, {
                name,
                description
            })
                .then((res) => {
                    navigate(`/trees/categories`, {state: {message: {success: `${res.data.name} edited successfully!`}}});
                })
        } else {
            await axios.post('/treeCategories', {
                name,
                description
            })
                .then((res) => {
                    navigate(`/trees/categories`, {state: {message: {success: `${res.data.name} created successfully!`}}});
                })
        }
    }
    return (
        <ContainerComponent>
            <h1 className={styles.pageTitle}>{id ? (`Editing ${name} category`) : ('Creating new category')}</h1>
            <form onSubmit={(e) => {
                onFormSubmitHandler(e)
            }}>
                <TextInputLabeled
                    id='name'
                    labelName='Category name'
                    type='text'
                    name='name'
                    stateValue={name}
                    onStateChange={setName}
                />
                <TextAreaLabeled
                    id='description'
                    labelName='Category description'
                    name='description'
                    stateValue={description}
                    onStateChange={setDescription}
                />
                <button className={styles.btn}> {id ? ('Save changes') : ('Create')}</button>
            </form>
        </ContainerComponent>
    )
}
export default TreeCategoryFormPage
