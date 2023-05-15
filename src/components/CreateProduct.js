import React from 'react';
import { Formik, Form, Field } from 'formik';
import '../styles/CreateProduct.css';

const CreateProduct = () => {
    
    const initialValues = {
        name: '',
        shortDescription: '',
        description: '',
        price: '',
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='CreateProduct'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
                <Form>
                    <label>Nazwa</label>
                    <Field 
                        id='inputCreateProduct' 
                        name='name' 
                        placeholder='(np. Bulbulator...)' 
                    />
                    <label>Krótki opis</label>
                    <Field 
                        id='inputCreateProduct' 
                        name='shortDescription' 
                        placeholder='Krótki opis' 
                    />
                    <label>Opis</label>
                    <Field 
                        id='inputCreateProduct' 
                        name='description' 
                        placeholder='Długi opis' 
                    />
                    <label>Cena</label>
                    <Field 
                        id='inputCreateProduct' 
                        name='price' 
                        placeholder='(np. 55)' 
                    />
                </Form>
            </Formik>
        </div>
    );
}

export default CreateProduct;