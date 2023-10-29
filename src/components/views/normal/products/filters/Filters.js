import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import markActions from "../../../../../api/markActions";
import categoryActions from "../../../../../api/categoryActions";

import MultiSelectFilter from "./multiSelectFilter/MultiSelectFilter";

import './filters.css'

const Filters = ({updateSelectedMarks, updateSelectedCategories, refresh}) => {
    const { t } = useTranslation(null, { keyPrefix: 'components.products.filters' })

    const [categories, setCategories] = useState(null);
    const [marks, setMarks] = useState(null);
    const [isCatExpanded, setIsCatExpanded] = useState(false);
    const [isMarkExpanded, setIsMarkExpanded] = useState(false);

  const toggleCategories = () => {
    setIsCatExpanded(!isCatExpanded);
  };
  const toggleMarks = () => {
    setIsMarkExpanded(!isMarkExpanded);
  }

  const catCaretStyle = {
    rotate: isCatExpanded ? '180deg' : '0deg'
  }
  const markCaretStyle = {
    rotate: isMarkExpanded ? '180deg' : '0deg'
  }
  const catStyle = {
    maxHeight: isCatExpanded ? '200px' : '0',
    opacity: isCatExpanded ? 1 : 0,
    overflow: 'hidden',
    transition: 'max-height 1s, opacity 1s',
  };
  const markStyle = {
    maxHeight: isMarkExpanded ? '200px' : '0',
    opacity: isMarkExpanded ? 1 : 0,
    overflow: 'hidden',
    transition: 'max-height 1s, opacity 1s',
  };

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
                    {(marks) && <MultiSelectFilter style={markStyle} key={1} data={marks} set={updateSelectedMarks}/>}
                    <svg xmlns="http://www.w3.org/2000/svg" style={markCaretStyle} onClick={toggleMarks} width="20" height="20" fill="currentColor" className="expand-collapse" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </div>
                <div className="categories">
                    <span className="title">{t('categories')}</span>
                    <span className="line"></span>
                    {(categories) && <MultiSelectFilter style={catStyle} key={2} data={categories} set={updateSelectedCategories}/>}
                    <svg xmlns="http://www.w3.org/2000/svg" style={catCaretStyle} onClick={toggleCategories} width="20" height="20" fill="currentColor" className="expand-collapse" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </div>
                <div className="buttons">
                    <button onClick={() => refresh()}>
                        {t('confirm-button')}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filters;