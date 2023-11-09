import React, { useEffect, useState } from 'react';

import productActions from '../../../../../api/productActions';

import Checkbox from './Checkbox';

import './select-asset.css';

const SelectList = ({attributeType, attributeNames, productId}) => {
    const [selectedAttributes, setSelectedAttributes] = useState([])
    useEffect(() => {
        productActions.getProductForeignAttributes(attributeType, productId).then(res => {
            setSelectedAttributes(res.body);
        }) 
    }, [productId, attributeType])
    
    const handleChange = (attributeId) => {
        setSelectedAttributes(prevAttributes => {
            const wasBefore = prevAttributes.some(({ProductId, CategoryId, MarkId}) => ProductId === productId && 
            (CategoryId === attributeId || MarkId === attributeId));
            if(!wasBefore) {
                productActions.addProductForeignAttribute(attributeType, productId, attributeId)
                if(attributeType === 'category') 
                return [...prevAttributes, {ProductId: productId, CategoryId: attributeId}]
                if(attributeType === 'mark') 
                return [...prevAttributes, {ProductId: productId, MarkId: attributeId}]
            } else {
                productActions.delProductForeignAttribute(attributeType, productId, attributeId);
                return prevAttributes.filter(({CategoryId, MarkId}) => 
                {
                    if(attributeType === 'category') { return CategoryId !== attributeId }
                    else if(attributeType === 'mark') { return MarkId !== attributeId }
                    else { return false }
                })
                
            }
        })
    }
    
    const isChecked = (attributeId) => {
        return selectedAttributes.some(({ProductId, CategoryId, MarkId}) => ProductId === productId && 
        (CategoryId === attributeId || MarkId === attributeId));
    }

    return (
        <div className='select-wrapper'>
            {selectedAttributes && attributeNames.map(attribute => 
            <Checkbox 
            key={attribute.id} 
            id={attribute.id} 
            text={attribute.name}
            checked={isChecked(attribute.id)}
            handleChange={() => handleChange(attribute.id)}/>
            )}
        </div>
    )
}

export default SelectList;
