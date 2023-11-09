import { useEffect, useState } from "react";

import ProductForm from "./productForm/ProductForm";
import CategoriesForm from "./categoriesForm/CategoriesForm";
import ProductGallery from "../tableAssets/ProductGallery";
import DiscountForm from "./discountsForm/DiscountForm";
import MarkForm from "./marksForm/MarkForm";
import DiscountGroupForm from "./discountGroupForm/DiscountGroupForm";

import './overlay.css';

const Overlay = ({ overlayOptions }) => {
    const [componentToDisplay, setComponentToDisplay] = useState(null);
    const { tableName, type, oldData, goBack, reloadPage } = overlayOptions;
    useEffect(() => {
        if (tableName === 'products') {
            if (type === 'singleProductGallery') {
                setComponentToDisplay(<ProductGallery
                    type={type} 
                    oldData={oldData} 
                    goBack={goBack} 
                    reloadPage={reloadPage}
                    />)
                } else {
                setComponentToDisplay(<ProductForm 
                    type={type} 
                    oldData={oldData} 
                    goBack={goBack} 
                    reloadPage={reloadPage}
                    />)
                }
            
        } else if (tableName === 'categories') {
            setComponentToDisplay(<CategoriesForm
                type={type} 
                oldData={oldData} 
                goBack={goBack} 
                reloadPage={reloadPage}
                />)
        } else if (tableName === 'discounts') {
            setComponentToDisplay(<DiscountForm
                type={type} 
                oldData={oldData} 
                goBack={goBack} 
                reloadPage={reloadPage}
                />)
        } else if (tableName === 'marks') {
            setComponentToDisplay(<MarkForm
                type={type} 
                oldData={oldData} 
                goBack={goBack} 
                reloadPage={reloadPage}
                />)
        } else if (tableName === 'discountGroups') {
            setComponentToDisplay(<DiscountGroupForm
                type={type} 
                oldData={oldData} 
                goBack={goBack} 
                reloadPage={reloadPage}
                />)
        }

    }, [type, oldData, goBack, reloadPage, tableName])

    return (
        <div className="overlay">
            <div className="overlay-content">
                {componentToDisplay}
            </div>
        </div>
    )
}

export default Overlay;