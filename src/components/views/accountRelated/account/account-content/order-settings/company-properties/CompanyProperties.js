import { useContext } from "react";

import accountActions from "../../../../../../../api/accountActions";

import { AccountContext } from "../../../../../../../context/account";
import SimpleProperty from "../../simple-property/SimpleProperty";
import NipProperty from "./nip-property/NipProperty";

const CompanyProperties = () => {
    const { companyData } = useContext(AccountContext);

    return (
        <div className="company-properties properties">
            {companyData && <>
                <NipProperty companyData={companyData} />
                <SimpleProperty 
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.company-name'
                placeholderTranslation={'order-settings.delivery-or-company-properties.company-name-placeholder'}
                attr={companyData.companyName}
                updateFunction={accountActions.companyData.updateCompanyName}
                />
                <SimpleProperty 
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.country'
                placeholderTranslation={'order-settings.delivery-or-company-properties.country-placeholder'}
                attr={companyData.country}
                updateFunction={accountActions.companyData.updateCountry}
                />
                <SimpleProperty 
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.city'
                placeholderTranslation={'order-settings.delivery-or-company-properties.city-placeholder'}
                attr={companyData.city}
                updateFunction={accountActions.companyData.updateCity}
                />
                <SimpleProperty 
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.postal-code'
                placeholderTranslation={'order-settings.delivery-or-company-properties.postal-code-placeholder'}
                attr={companyData.postalCode}
                updateFunction={accountActions.companyData.updatePostalCode}
                />
                <SimpleProperty 
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.street'
                placeholderTranslation={'order-settings.delivery-or-company-properties.street-placeholder'}
                attr={companyData.street}
                updateFunction={accountActions.companyData.updateStreet}
                />
                <SimpleProperty 
                inputType='text'
                titleTranslation='order-settings.delivery-or-company-properties.home-number'
                placeholderTranslation={'order-settings.delivery-or-company-properties.home-number-placeholder'}
                attr={companyData.homeNumber}
                updateFunction={accountActions.companyData.updateHomeNumber}
                />
            </>}
        </div>
    )
}

export default CompanyProperties;