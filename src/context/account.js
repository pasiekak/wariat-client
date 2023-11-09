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
                setAccountData(res.data);
                console.log(res.data);
            });
        }
    },[user, cookies.user])

    const setAccountData = (data) => {
        const {user, address, personalData, discountGroup, companyData} = data;
        setUser(user);
        setAddress(address);
        setPersonalData(personalData);
        setDiscountGroup(discountGroup);
        setCompanyData(companyData)
    }
    const clearAccount = () => {
        setUser(null);
        setAddress(null);
        setPersonalData(null);
        setDiscountGroup(null);
        setCompanyData(null);
    }

    return (
        <AccountContext.Provider
        value={{
            user,
            address,
            personalData,
            discountGroup,
            companyData,
            setAccountData,
            clearAccount
        }}>
            {children}
        </AccountContext.Provider>
    )
}