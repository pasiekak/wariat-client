import { useEffect, useState } from 'react';
import './edit-form.css'
import UserEditForm from './specificForms/UserEditForm';
import ProductEditForm from './specificForms/ProductEditForm';

const EditForm = ({tableName, oldData, goBack}) => {
    const [editComponent, setEditComponent] = useState(null);

    useEffect(() => {
        if (tableName === 'products') {
            setEditComponent(<ProductEditForm oldData={oldData} goBack={goBack}/>)
        } else if (tableName === 'users') {
            setEditComponent(<UserEditForm oldData={oldData} goBack={goBack} />)
        }
    }, [tableName, goBack, oldData])

    return (
        <div className="overlay">
            <div className="overlay-content">
                {editComponent}
            </div>
        </div>
    )
}

export default EditForm;