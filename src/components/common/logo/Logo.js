import { Link } from "react-router-dom";
import logo from '../../../images/wariatLogo.png';

import './logo.css';

const Logo = () => {
    return (
        <div className='Logo'>
            <Link to='/'><img src={logo} alt='Wariat logo'/></Link>
        </div>
    )
}

export default Logo;