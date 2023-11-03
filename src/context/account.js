import { useEffect, useState, createContext } from "react";
import { useCookies } from "react-cookie";
import accountActions from "../api/accountActions";
export const AccountContext = createContext();

export const AccountProvider = ({children}) => {
    const [cookies] = useCookies();
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        if(!user && cookies.user) {
            accountActions.login().then(res => {
                setAccountData(res.data);
            });
        }
    },[user])

    const setAccountData = (data) => {
        const {user, address} = data;
        setUser(user);
        setAddress(address);
    }
    const clearAccount = () => {
        setUser(null);
        setAddress(null);
    }

    return (
        <AccountContext.Provider
        value={{
            user,
            address,
            setAccountData,
            clearAccount
        }}>
            {children}
        </AccountContext.Provider>
    )
}