import React, { useEffect, useState } from 'react';

import productActions from '../../../../../api/productActions';

import './select-asset.css';

const MarkSelect = ({markNames, productId}) => {
    const [selectedMarks, setSelectedMarks] = useState([])
    useEffect(() => {
        productActions.getSingleProductMarks(productId).then(res => setSelectedMarks(res))
    },[productId])

    // Funkcja do sprawdzania, czy dana kategoria jest zaznaczona
    const isMarkChecked = (markId) => {
        return selectedMarks.includes(markId);
    }
    // Funkcja do obsługi zmiany stanu checkboxa
    const handleCheckboxChange = (markId) => {
        setSelectedMarks(prevMarks => {
        if (prevMarks.includes(markId)) {
            // Jeśli kategoria jest już zaznaczona, usuń ją z selectedCategories
            const newMarks = prevMarks.filter(id => id !== markId);
            productActions.delProductMark(productId, markId);
            return newMarks;
        } else {
            // Jeśli kategoria nie jest zaznaczona, dodaj ją do selectedCategories
            const newCategories = [...prevMarks, markId];
            productActions.addProductMark(productId, markId)
            return newCategories;
        }
        });
    }

    return (
        <div className="select-wrapper">
            <div className='select-checkbox'>
                {markNames && markNames.map((mark) => (
                    <Checkbox
                        label={mark.name}
                        value={mark.id}
                        checked={isMarkChecked(mark.id)}
                        onChange={() => handleCheckboxChange(mark.id)}
                        key={mark.id}
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

export default MarkSelect;
