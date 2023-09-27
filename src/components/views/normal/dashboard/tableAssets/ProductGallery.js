
import { useEffect, useState, useRef } from 'react';
import productActions from '../../../../../api/productActions';
import imageActions from '../../../../../api/imageActions';


import './productGallery.css';

const ProductGallery = ({type, oldData, goBack, reloadPage}) => {
    const inputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagesIds, setImagesIds] = useState(null)
    const [refreshProductGallery, setRefreshProductGallery] = useState(false);

    useEffect(() => {
        productActions.getSingleProductImages(oldData.id).then(response => {
            setImagesIds(response.images);
        })
    },[refreshProductGallery, oldData.id])

    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    }

    const uploadImage = () => {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('productId', oldData.id);
        formData.append('image', selectedImage);
        imageActions.addImage(formData).then(res => {
            setRefreshProductGallery(!refreshProductGallery)
            setSelectedImage(null)
        });
    }

    return (
        <div className="gallery-overlay-wrapper">
            <div className='gallery-wrapper'>
                <div className='pictures'>
                    {imagesIds && imagesIds.map(id => {
                        return <ImageTile 
                        key={id} 
                        imageId={id} 
                        refreshProductGallery={refreshProductGallery} 
                        setRefreshProductGallery={setRefreshProductGallery}/>
                    })}
                    <div className='pick-image-tile' onClick={handleImageClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <input 
                        type='file' 
                        accept='image/jpeg'
                        ref={inputRef}
                        onChange={handleImageChange}/>
                    </div>
                </div>
            </div>
            <div className='button-wrapper'>
                <button onClick={() => goBack()}>Wróć</button>
                {selectedImage && <button className='upload-tile' onClick={uploadImage}>Zapisz zdjęcie</button>}
            </div>
        </div>
    )
}

const ImageTile = ({imageId, refreshProductGallery, setRefreshProductGallery}) => {
    const [image, setImage] = useState(null);


    useEffect(() => {
        imageActions.getImage(imageId).then(res => {
            setImage(res)
        });
    },[imageId])

    const deletePhoto = (id) => {
        let approve = window.confirm('Na pewno chcesz usunąć to zdjęcie?')
        if (approve) {
            imageActions.deleteImage(id).then(res => {
                setRefreshProductGallery(!refreshProductGallery)
            });
        }
    }
    return (
        <div className='image-tile'>
            {
            image && 
            <>
                <img src={image} alt='' loading='lazy'/>
                <button className="remove-button" onClick={() => deletePhoto(imageId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </button>
            </>
            }
            
        </div>
    )
}

export default ProductGallery;