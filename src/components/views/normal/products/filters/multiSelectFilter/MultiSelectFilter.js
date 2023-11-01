import { useTranslation } from 'react-i18next';

import './multi-select-filter.css';

const MultiSelectFilter = ({data, style, set, t}) => {
    const handleChange = (e) => {
        const { name, checked } = e.target;

        set((prevValues) => {
            // Kopia poprzednich wartości
            const newValues = { ...prevValues };
    
            // Aktualizacja wartości dla bieżącego checkboxa
            newValues[name] = checked;
    
            // Sprawdź, czy wszystkie checkboxy są odznaczone, jeśli tak, to cały obiekt jest null
            const allUnchecked = Object.values(newValues).every(value => value === false);
            return allUnchecked ? null : newValues;
        });
    }

    return (
        <div className="MultiSelectFilter" style={style}>
            {data.length > 0 ? <form>
                {
                data.map((option) => (
                    <div className="singleFilter" key={option.id}>
                        <input
                            type="checkbox"
                            name={option.name}
                            onChange={handleChange}
                        />
                        <span className='optionFilter'>{option.name}</span>
                    </div>
                ))}
            </form> : <div className="singleFilter"><span className='optionFiler'>{t('no-filters-message')}</span></div>}
        </div>
    )
}

export default MultiSelectFilter;