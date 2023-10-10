import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";


const SearchBar = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { t } = useTranslation('searchBar', { keyPrefix: 'forms.searchBar' })

    const onSubmit = (data) => {

    }


    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder={t('placeholder')}/>
            </form>
        </div>
    )
}

export default SearchBar;