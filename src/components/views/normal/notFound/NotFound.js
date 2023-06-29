import React from 'react'
import './not-found.css';

const NotFound = () => {
    return (
        <div className='NotFound'>
            <p>Nie ma takiej strony.</p>
            <a href='/'>Wróć do strony głównej</a>
        </div>
    )
}

export default NotFound;