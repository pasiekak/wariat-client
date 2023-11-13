import { useContext } from "react";

import accountActions from "../../../../../../../api/accountActions";

import { AccountContext } from "../../../../../../../context/account";
import SimpleProperty from "../../simple-property/SimpleProperty";
import NipProperty from "./nip-property/NipProperty";

const CompanyProperties = () => {
    const { companyData, setCompanyData } = useContext(AccountContext);


    const uploadNIPdata = async (nip) => {
        let response = await accountActions.companyData.getDataByNIP(nip)
        if(response.success) {
            let updateBody = {
                nip: response.data.companyNip,
                companyName: response.data.companyName,
                city: response.data.companyCity,
                street: response.data.companyStreet,
                postalCode: response.data.companyPostalCode,
                country: response.data.companyCountry,
                buildingNumber: response.data.companyBuildingNumber
            }
            let response2 = await accountActions.companyData.updateAll(updateBody);
            if(response2.data.success) {
                setCompanyData(updateBody);
            }
            return response
        } else {
            return response
        }
    }

    return (
        <div className="company-properties properties">
            {companyData && <>
                <NipProperty nipOriginal={companyData.nip} uploadNIPdata={uploadNIPdata}/>
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
                titleTranslation='order-settings.delivery-or-company-properties.building-number'
                placeholderTranslation={'order-settings.delivery-or-company-properties.building-number-placeholder'}
                attr={companyData.buildingNumber}
                updateFunction={accountActions.companyData.updateBuildingNumber}
                />
            </>}
        </div>
    )
}

export default CompanyProperties;