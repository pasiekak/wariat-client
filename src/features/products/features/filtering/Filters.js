import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import markActions from "../../../../api/markActions";
import categoryActions from "../../../../api/categoryActions";

import MultiSelectFilter from "./components/MultiSelectFilter";

import './styles/filters.css'

const Filters = ({updateSelectedMarks, updateSelectedCategories, refresh}) => {
    const { t } = useTranslation(null, { keyPrefix: 'components.products.filters' })

    const [categories, setCategories] = useState(null);
    const [marks, setMarks] = useState(null);
    const [isCatExpanded, setIsCatExpanded] = useState(false);
    const [isMarkExpanded, setIsMarkExpanded] = useState(false);


    useEffect(() => {
        markActions.getMarkNames().then(res => {
            setMarks(res.body)
        })
        categoryActions.getCategoryNames().then(res => {
            setCategories(res.body)
        })
    }, [])

    return (
        <div className="Filters">
            <div className="filters-wrapper">
                <span className="filters-title">{t('title')}</span>
                <span className="line"></span>
                <div className="marks">
                    <span className="title">{t('marks')}</span>
                    <span className="line"></span>
                    {
                    (marks) && <MultiSelectFilter className={`MultiSelectFilter${isMarkExpanded ? ' open' : ''}`} key={1} data={marks} set={updateSelectedMarks} t={t}/>
                    }
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setIsMarkExpanded(!isMarkExpanded)} width="20" height="20" fill="currentColor" className={isMarkExpanded ? 'open' : ''} viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </div>
                <div className="categories">
                    <span className="title">{t('categories')}</span>
                    <span className="line"></span>
                    {(categories) && <MultiSelectFilter className={`MultiSelectFilter${isCatExpanded? ' open': ''}`} key={2} data={categories} set={updateSelectedCategories} t={t}/>}
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setIsCatExpanded(!isCatExpanded)} width="20" height="20" fill="currentColor" className={isCatExpanded ? 'open' : ''} viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </div>
                <div className="buttons">
                    <Button variant="dark" onClick={() => refresh()}>{t('confirm-button')}</Button>
                </div>
            </div>
        </div>
    )
}

export default Filters;