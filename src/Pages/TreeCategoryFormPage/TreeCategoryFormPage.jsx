import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios.jsx';
import TextInputLabeled from '../../Components/TextInputLabeled/TextInputLabeled.jsx';
import TextAreaLabeled from '../../Components/TextAreaLabeled/TextAreaLabeled.jsx';
import ContainerComponent from '../../Components/ContainerComponent/ContainerComponent.jsx';
import styles from './TreeCategoryFormPage.module.scss';

const TreeCategoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors }, reset, formState } = useForm({ mode: 'onChange' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const getTree = async () => {
                try {
                    setIsLoading(true);
                    const response = await axios.get(`/treeCategories/${id}`);
                    const { name, description } = response.data;
                    setValue('name', name);
                    setValue('description', description);
                    setIsLoading(false);
                } catch (e) {
                    console.log(e);
                }
            };
            getTree();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const endpoint = id ? `/treeCategories/${id}` : '/treeCategories';
            const method = id ? 'patch' : 'post';
            const response = await axios[method](endpoint, data);
            const message = id ? `${response.data.name} edited successfully!` : `${response.data.name} created successfully!`;
            navigate(`/trees/categories`, { state: { message: { success: message } } });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ContainerComponent>
            <h1 className={styles.pageTitle}>{id ? (`Editing category`) : ('Creating new category')}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInputLabeled
                    id='name'
                    labelName='Category name'
                    type='text'
                    name='name'
                    error={errors.name}
                    onStateChange={(value) => setValue('name', value)}
                    {...register('name', { required: 'Category name is required' })}
                />
                <TextAreaLabeled
                    id='description'
                    labelName='Category description'
                    name='description'
                    error={errors.description}
                    onStateChange={(value) => setValue('description', value)}
                    {...register('description', { required: 'Category description is required' })}
                />
                <button className={styles.btn} disabled={isLoading}>
                    {isLoading ? 'Loading...' : id ? 'Save changes' : 'Create'}
                </button>
            </form>
        </ContainerComponent>
    );
};

export default TreeCategoryFormPage;
