import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AccountContent = (props) => {
    const { t: tAtr } = useTranslation('account', { keyPrefix: 'account.attributes' });
    const { t: tMod } = useTranslation('account', { keyPrefix: 'account.moderator' });


    return (
        <div className='AccountContent'>
            <div className='accountAttributes'>
                <p>{tAtr('username')}: {props.user.username}</p>
                <p>{tAtr('email')}: {props.user.email}</p>
                <p>{tAtr('firstName')}: {props.user.firstName}</p>
                <p>{tAtr('lastName')}: {props.user.lastName}</p>
            </div>
            {props.mod ? 
                <div className='moderatorContent'>
                <Link to='/dashboard' state={{ user: props.user }}>{tMod('link')}</Link>
                </div>
            : null}
        </div>
    )
}

export default AccountContent;