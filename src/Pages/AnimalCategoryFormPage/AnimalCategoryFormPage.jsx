import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios.jsx';
import TextInputLabeled from '../../Components/TextInputLabeled/TextInputLabeled.jsx';
import TextAreaLabeled from '../../Components/TextAreaLabeled/TextAreaLabeled.jsx';
import ContainerComponent from '../../Components/ContainerComponent/ContainerComponent.jsx';
import styles from './AnimalCategoryForm.module.scss';

const AnimalCategoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors }, reset, formState } = useForm({ mode: 'onChange' });

    useEffect(() => {
        if (id) {
            const getAnimal = async () => {
                try {
                    const response = await axios.get(`/categories/${id}`);
                    const { name, description } = response.data;
                    setValue('name', name);
                    setValue('description', description);
                } catch (e) {
                    console.log(e);
                }
            };
            getAnimal();
        }
    }, [id, setValue]);

    const onFormSubmitHandler = async (data) => {
        try {
            if (id) {
                await axios.patch(`/categories/${id}`, data);
                navigate(`/animals/categories`, { state: { message: { success: `${data.name} edited successfully!` } } });
            } else {
                await axios.post('/categories', data);
                navigate(`/animals/categories`, { state: { message: { success: `${data.name} created successfully!` } } });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ContainerComponent>
            <h1 className={styles.pageTitle}>{id ? `Editing category` : 'Creating new category'}</h1>
            <form onSubmit={handleSubmit(onFormSubmitHandler)}>
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
                <button className={styles.btn}>
                    {id ? 'Save changes' : 'Create'}
                </button>
            </form>
        </ContainerComponent>
    );

};

export default AnimalCategoryFormPage;
