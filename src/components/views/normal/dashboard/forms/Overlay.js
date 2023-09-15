import { useEffect, useState } from "react";

import ProductForm from "./productForm/ProductForm";
import CategoriesForm from "./categoriesForm/CategoriesForm";

import './overlay.css';

const Overlay = ({ overlayOptions }) => {
    const [componentToDisplay, setComponentToDisplay] = useState(null);

    useEffect(() => {
        if (overlayOptions.tableName === 'products') {
            setComponentToDisplay(<ProductForm 
                type={overlayOptions.type} 
                oldData={overlayOptions.oldData} 
                goBack={overlayOptions.goBack} 
                setRefresh={overlayOptions.setRefresh}
                refresh={overlayOptions.refresh}/>)
        } else if (overlayOptions.tableName === 'categories') {
            setComponentToDisplay(<CategoriesForm
                type={overlayOptions.type} 
                oldData={overlayOptions.oldData} 
                goBack={overlayOptions.goBack} 
                setRefresh={overlayOptions.setRefresh}
                refresh={overlayOptions.refresh}/>)
        }
        console.log(overlayOptions);
    }, [overlayOptions])

    return (
        <div className="overlay">
            <div className="overlay-content">
                {componentToDisplay}
            </div>
        </div>
    )
}

export default Overlay;