import { useContext } from 'react';

import { AccountContext } from '../../../../../../../context/account';
import PhoneNumberProperty from './phone-number-property/PhoneNumberProperty';
import FirstLastNameProperty from './first-last-name-property/FirstLastNameProperty';

import './person-properties.css';

const PersonProperties = () => {
    const { personalData } = useContext(AccountContext);

    return (
        <div className='person-properties properties'>
            <FirstLastNameProperty personalData={personalData}/>
            <PhoneNumberProperty personalData={personalData}/>
        </div>
    )
}

export default PersonProperties;