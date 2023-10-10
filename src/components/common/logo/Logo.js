import { Link } from "react-router-dom";
import logo from './wariatLogo.png';
import logoPhone from './wariatPhone.png';
import './logo.css';

const Logo = ({width, height, withPhone=false}) => {
    const logoStyle = {
        width: width,
        height: height
    }

    return (
        <div className='Logo'>
            <Link to='/'><img src={withPhone ? logoPhone : logo} style={logoStyle} alt='Wariat logo'/></Link>
        </div>
    )
}

export default Logo;