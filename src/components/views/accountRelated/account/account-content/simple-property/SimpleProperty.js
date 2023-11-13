import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SimpleProperty = ({inputType, titleTranslation, placeholderTranslation, attr, updateFunction}) => {
    const { t } = useTranslation()
    const [temp, setTemp] = useState(attr);
    const [attribute, setAttribute] = useState(attr ? attr : '')
    const [showEditor, setShowEditor] = useState(false);

    useEffect(() => {
        setAttribute(attr ? attr : '')
    },[attr])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(attribute !== '') {
            updateFunction(attribute).then(res => {
                if(res.data.success) {
                    setTemp(attribute);
                }
            })
            setShowEditor(false);
        } else {
            setDefaultState();
            setShowEditor(false);
        }
    }

    const setDefaultState = () => {
        setAttribute(temp || '');
    }

    return (
        <div className='single-property-wrapper'>
            <h5>{t(`components.account.${titleTranslation}`)}</h5>
            <div className="single-property">
                {showEditor ?
                <Form onSubmit={handleSubmit}>
                    <Form.Control 
                    type={inputType}
                    placeholder={t(`components.account.${placeholderTranslation}`)} 
                    value={attribute}
                    onChange={(e) => setAttribute(e.target.value)}/>
                    <div className='buttons-wrapper'>
                        <Button variant='outline-dark' onClick={() => {
                            setShowEditor(false);
                            setDefaultState();     
                        }}>{t('components.account.go-back-button')}</Button>
                        <Button type='submit' variant='outline-dark'>{t('components.account.confirm-button')}</Button>
                    </div>
                </Form>
                :
                <div className="property-row">
                    <span>
                        {attribute ? attribute : t('components.account.empty-property-message')}
                    </span>
                    <Button variant='outline-dark' onClick={() => setShowEditor(true)}>{t('components.account.change-button')}</Button>
                </div>
                }
            </div>
        </div>
    )
}

export default SimpleProperty;