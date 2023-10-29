import { useTranslation } from "react-i18next";

import './search-bar.css';

const SearchBar = ({ updateSearchWord, refresh }) => {
    const { t } = useTranslation(null, { keyPrefix: 'components.products.search-bar' });

    const handleInputChange = (e) => {
        const searchWord = e.target.value;
        updateSearchWord(searchWord);
    };

    return (
        <div className="SearchBar">
            <div className="input-wrapper">
                <label>
                    <input type="text" onChange={handleInputChange} placeholder={t('placeholder')}/>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={refresh} fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default SearchBar;
