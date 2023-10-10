import React, { useEffect, useState } from 'react';

import productActions from '../../../../../api/productActions';

import './select-asset.css';

const CategorySelect = ({categoryNames, productId}) => {
    const [selectedCategories, setSelectedCategories] = useState([])
    useEffect(() => {
        productActions.getSingleProductCategories(productId).then(res => setSelectedCategories(res))
    },[productId])

    // Funkcja do sprawdzania, czy dana kategoria jest zaznaczona
    const isCategoryChecked = (categoryId) => {
        return selectedCategories.includes(categoryId);
    }
    // Funkcja do obsługi zmiany stanu checkboxa
    const handleCheckboxChange = (categoryId) => {
        setSelectedCategories(prevCategories => {
        if (prevCategories.includes(categoryId)) {
            // Jeśli kategoria jest już zaznaczona, usuń ją z selectedCategories
            const newCategories = prevCategories.filter(id => id !== categoryId);
            productActions.delProductCategory(productId, categoryId);
            return newCategories;
        } else {
            // Jeśli kategoria nie jest zaznaczona, dodaj ją do selectedCategories
            const newCategories = [...prevCategories, categoryId];
            productActions.addProductCategory(productId, categoryId)
            return newCategories;
        }
        });
    }

    return (
        <div className="select-wrapper">
            <div className='select-checkbox'>
                {categoryNames && categoryNames.map((category) => (
                    <Checkbox
                        label={category.name}
                        value={category.id}
                        checked={isCategoryChecked(category.id)}
                        onChange={() => handleCheckboxChange(category.id)}
                        key={category.id}
                    />
                ))}
            </div>
        </div>
    );
};

const Checkbox = ({ label, checked, value, onChange }) => {

    return (
      <label>
        <input type="checkbox" value={value} checked={checked} onChange={onChange} />
        {label}
      </label>
    );
  };

export default CategorySelect;
