import { useContext } from "react"

import accountActions from "../../../../../../../api/accountActions";

import { AccountContext } from "../../../../../../../context/account"
import SimpleProperty from "../../simple-property/SimpleProperty";

const DeliveryProperties = () => {
    const { address, updateAttributeValues } = useContext(AccountContext);

    return (
        <div className="delivery-properties properties">
            {address && <>
                <SimpleProperty 
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.country'
                placeholderTranslation={'order-settings.delivery-or-company-properties.country-placeholder'}
                attrName={'country'}
                attrValue={address.country}
                updateFunction={accountActions.address.updateCountry}
                updateContextFunction={updateAttributeValues}
                contextAttrName={'address'}
                />
                <SimpleProperty
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.city'
                placeholderTranslation={'order-settings.delivery-or-company-properties.city-placeholder'}
                attrName={'city'}
                attrValue={address.city}
                updateFunction={accountActions.address.updateCity}
                updateContextFunction={updateAttributeValues}
                contextAttrName={'address'}
                />
                <SimpleProperty
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.street'
                placeholderTranslation={'order-settings.delivery-or-company-properties.street-placeholder'}
                attrName={'street'}
                attrValue={address.street}
                updateFunction={accountActions.address.updateStreet}
                updateContextFunction={updateAttributeValues}
                contextAttrName={'address'}
                />
                <SimpleProperty
                inputType='number'
                titleTranslation='order-settings.delivery-or-company-properties.home-number'
                placeholderTranslation={'order-settings.delivery-or-company-properties.home-number-placeholder'}
                attrName={'homeNumber'}
                attrValue={address.homeNumber}
                updateFunction={accountActions.address.updateHomeNumber}
                updateContextFunction={updateAttributeValues}
                contextAttrName={'address'}
                />
                <SimpleProperty
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.postal-code'
                placeholderTranslation={'order-settings.delivery-or-company-properties.postal-code-placeholder'}
                attrName={'postalCode'}
                attrValue={address.postalCode}
                updateFunction={accountActions.address.updatePostalCode}
                updateContextFunction={updateAttributeValues}
                contextAttrName={'address'}
                />
            </>}
        </div>
    )
}

export default DeliveryProperties