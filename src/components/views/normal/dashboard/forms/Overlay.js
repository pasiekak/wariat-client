import { useEffect, useState } from "react";

import ProductForm from "./productForm/ProductForm";
import CategoriesForm from "./categoriesForm/CategoriesForm";
import ProductGallery from "../tableAssets/ProductGallery";
import DiscountForm from "./discountsForm/DiscountForm";

import './overlay.css';

const Overlay = ({ overlayOptions }) => {
    const [componentToDisplay, setComponentToDisplay] = useState(null);
    const { tableName, type, oldData, goBack, setRefresh, refresh } = overlayOptions;
    useEffect(() => {
        if (tableName === 'products') {
            if (type === 'singleProductGallery') {
                setComponentToDisplay(<ProductGallery
                    type={type} 
                    oldData={oldData} 
                    goBack={goBack} 
                    setRefresh={setRefresh}
                    refresh={refresh}
                    />)
                } else {
                setComponentToDisplay(<ProductForm 
                    type={type} 
                    oldData={oldData} 
                    goBack={goBack} 
                    setRefresh={setRefresh}
                    refresh={refresh}
                    />)
                }
            
        } else if (tableName === 'categories') {
            setComponentToDisplay(<CategoriesForm
                type={type} 
                oldData={oldData} 
                goBack={goBack} 
                setRefresh={setRefresh}
                refresh={refresh}
                />)
        } else if (tableName === 'discounts') {
            setComponentToDisplay(<DiscountForm
                type={type} 
                oldData={oldData} 
                goBack={goBack} 
                setRefresh={setRefresh}
                refresh={refresh}
                />)
        }

    }, [type, oldData, goBack, setRefresh, refresh, tableName])

    return (
        <div className="overlay">
            <div className="overlay-content">
                {componentToDisplay}
            </div>
        </div>
    )
}

export default Overlay;