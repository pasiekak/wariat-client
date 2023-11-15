import { useContext } from 'react';

import { AccountContext } from '../../../../../../../context/account';
import PhoneNumberProperty from './phone-number-property/PhoneNumberProperty';
import FirstLastNameProperty from './first-last-name-property/FirstLastNameProperty';

import './person-properties.css';

const PersonProperties = () => {
    const { personalData, updateAttributeValues } = useContext(AccountContext);

    return (
        <div className='person-properties properties'>
            <FirstLastNameProperty firstName={personalData.firstName} lastName={personalData.lastName} updateContextFunction={updateAttributeValues}/>
            <PhoneNumberProperty phone={personalData.phone} updateContextFunction={updateAttributeValues}/>
        </div>
    )
}

export default PersonProperties;