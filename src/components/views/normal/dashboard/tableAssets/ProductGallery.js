
import { useEffect, useState, useRef } from 'react';
import productActions from '../../../../../api/productActions';
import imageActions from '../../../../../api/imageActions';


import './productGallery.css';

const ProductGallery = ({type, oldData, goBack, reloadPage}) => {
    const inputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState(null);
    const [haveMain, setHaveMain] = useState(false);
    const [refreshProductGallery, setRefreshProductGallery] = useState(false);

    useEffect(() => {
        productActions.getSingleProductImages(oldData.id).then(response => {
            setHaveMain(response.body.some(image => image.main === true));
            setImages(response.body);
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
        formData.append('main', false);
        imageActions.addImage(formData).then(res => {
            setRefreshProductGallery(!refreshProductGallery)
            setSelectedImage(null)
        });
    }

    return (
        <div className="gallery-overlay-wrapper">
            <div className='gallery-wrapper'>
                <div className='pictures'>
                    {images && images.map(image => {
                        return <ImageTile 
                        key={image.id} 
                        imageId={image.id} 
                        refreshProductGallery={refreshProductGallery} 
                        setRefreshProductGallery={setRefreshProductGallery}
                        haveMain={haveMain}
                        setHaveMain={setHaveMain}
                        isMain={image.main}
                        />
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

const ImageTile = ({imageId, refreshProductGallery, setRefreshProductGallery, haveMain, setHaveMain, isMain}) => {
    const [main, setMain] = useState(isMain);

    const deletePhoto = () => {
        let approve = window.confirm('Na pewno chcesz usunąć to zdjęcie?')
        if (approve) {
            imageActions.deleteImage(imageId).then(res => {
                setRefreshProductGallery(!refreshProductGallery)
            });
        }
    }

    const setPhotoAsMain = () => {
        // Check if there is main photo for this product
        if(!haveMain) {
            setHaveMain(true);
            setMain(true);
            imageActions.updateImage(imageId, { main: true });
        } else if (main) {
            // This photo is main one, change it to not main.
            setHaveMain(false);
            setMain(false);
            imageActions.updateImage(imageId, { main: false });
        } else if (haveMain) {
            window.alert('Główne zdjęcie może być tylko jedno.')
        }
    }
    return (
        <div className='image-tile'>
            {
            imageId && 
            <>
                <img src={`/api/images/${imageId}`} alt='' loading='lazy'/>
                <button className="remove-button" onClick={() => deletePhoto()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </button>
                <button className='main-button' onClick={() => setPhotoAsMain()}>
                    {
                        main ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>
                    }
                </button>
            </>
            }
            
        </div>
    )
}

export default ProductGallery;