import { useContext } from "react"

import accountActions from "../../../../../../../api/accountActions";

import { AccountContext } from "../../../../../../../context/account"
import SimpleProperty from "../../simple-property/SimpleProperty";

const DeliveryProperties = () => {
    const { address } = useContext(AccountContext);

    return (
        <div className="delivery-properties properties">
            {address && <>
                <SimpleProperty 
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.country'
                placeholderTranslation={'order-settings.delivery-or-company-properties.country-placeholder'}
                attr={address.country}
                updateFunction={accountActions.address.updateCountry}
                />
                <SimpleProperty
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.city'
                placeholderTranslation={'order-settings.delivery-or-company-properties.city-placeholder'}
                attr={address.city}
                updateFunction={accountActions.address.updateCity}
                />
                <SimpleProperty
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.street'
                placeholderTranslation={'order-settings.delivery-or-company-properties.street-placeholder'}
                attr={address.street}
                updateFunction={accountActions.address.updateStreet}
                />
                <SimpleProperty
                inputType='number'
                titleTranslation='order-settings.delivery-or-company-properties.home-number'
                placeholderTranslation={'order-settings.delivery-or-company-properties.home-number-placeholder'}
                attr={address.homeNumber}
                updateFunction={accountActions.address.updateHomeNumber}
                />
                <SimpleProperty
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.postal-code'
                placeholderTranslation={'order-settings.delivery-or-company-properties.postal-code-placeholder'}
                attr={address.postalCode}
                updateFunction={accountActions.address.updatePostalCode}
                />
            </>}
        </div>
    )
}

export default DeliveryProperties