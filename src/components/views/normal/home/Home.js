import  React from 'react';
import './home.css';

import Logo from '../../../common/logo/Logo';

const Home = () => {

    return (
        <div className="Home bck-smooth">
            <Logo width={400} height={400} withPhone={true}/>
            <div className='page-description'>
                <span>
                    Eiusmod ullamco nulla eiusmod qui. Cillum irure ipsum aute occaecat ipsum. Deserunt proident voluptate laboris aliqua proident nulla dolore sit magna proident laborum elit.
                    Ea eu velit dolor sit quis ad proident sint id nisi sit officia officia. Et sint deserunt aute tempor exercitation elit exercitation aliqua commodo exercitation do officia quis tempor. Sunt aute duis aute laborum dolore occaecat nostrud excepteur voluptate cupidatat cupidatat occaecat.
                </span>
            </div>
        </div>
    );   
}

export default Home;