import { useEffect, useState, createContext } from "react";
import { useCookies } from "react-cookie";
import accountActions from "../api/accountActions";
export const AccountContext = createContext();

export const AccountProvider = ({children}) => {
    const [cookies] = useCookies();
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [personalData, setPersonalData] = useState(null);
    const [discountGroup, setDiscountGroup] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        if(!user && cookies.user) {
            accountActions.login().then(res => {
                if(res.success) {
                    setAccountData(res.data)
                };
            });
        };
    },[user, cookies]);

    const setAccountData = (data) => {
        const {user, address, personalData, discountGroup, companyData} = data;
        setUser(user);
        setAddress(address);
        setPersonalData(personalData);
        setDiscountGroup(discountGroup);
        setCompanyData(companyData);
    }
    const clearAccount = () => {
        setUser(null);
        setAddress(null);
        setPersonalData(null);
        setDiscountGroup(null);
        setCompanyData(null);
    }

    const updateAttributeValues = (attributeName, newValue) => {
        switch (attributeName) {
            case 'user':
                setUser(prevUser => ({...prevUser, ...newValue}));
                break;
            case 'address':
                setAddress(prevAddress => ({...prevAddress, ...newValue}));
                break;
            case 'personalData':
                setPersonalData(prevPersonalData => ({...prevPersonalData, ...newValue}));
                break;
            case 'discountGroup':
                setDiscountGroup(prevDiscountGroup => ({...prevDiscountGroup, ...newValue}));
                break;
            case 'companyData':
                setCompanyData(prevCompanyData => ({...prevCompanyData, ...newValue}));
                break;
            default:
                console.warn(`Unknown attribute name: ${attributeName}`);
        }
    };

    return (
        <AccountContext.Provider
        value={{
            user,
            address,
            personalData,
            discountGroup,
            companyData,
            setAccountData,
            updateAttributeValues,
            setCompanyData,
            clearAccount
        }}>
            {children}
        </AccountContext.Provider>
    )
}