import { useForm } from "react-hook-form";

import discountActions from "../../../../../../api/discountActions";

const DiscountForm = ({type, oldData, goBack, reloadPage}) => {
    console.log(oldData);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: type === 'edit' ? {
            ...oldData,
            CategoryId: oldData.CategoryId === null ? '' : oldData.CategoryId,
            UserId: oldData.UserId === null ? '' : oldData.UserId,
            ProductId: oldData.ProductId === null ? '' : oldData.ProductId,
        } : null
    });
    const CategoryIdField = watch('CategoryId');
    const UserIdField = watch('UserId');
    const ProductIdField = watch('ProductId');

    const onSubmit = (data) => {
        if (type === 'edit') {
            edit(data)
        } else if (type === 'add') {
            add(data)
        } else if (type === 'delete') {
            del(data)
        }
        reloadPage()
        goBack();
    }
    const add = async (data) => {
        let res = await discountActions.addDiscount(data)
        if(res.success) {
            alert('Pomyślnie dodano zniżkę')
        } else {
            alert(res.message)
        }
    }

    const edit = async (newData) => {
        let res = await discountActions.editDiscount(oldData.id, newData)
        if(res.success) {
            alert('Pomyślnie edytowano zniżkę')
        } else {
            alert(res.message)
        }
    }

    const del = async () => {
        let res = await discountActions.deleteDiscount(oldData.id)
        if(res.success) {
            alert('Pomyślnie usunięto zniżkę')
        } else {
            alert(res.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="discountForm">
            {
            (type === 'add' || type === 'edit') && 
            <>
                {type === 'add' && <h2>Dodawanie zniżki</h2>}
                {type === 'edit' && <h2>Edytowanie zniżki</h2>}

                <label htmlFor="expires">Data ważności</label>
                <input 
                type="date"
                min={new Date().toISOString().split("T")[0]}
                {...register('expires', {required: { value: true, message: 'To pole jest wymagane'}})} />
                {errors.expires?.type === 'required' && <span className="error-span">To pole jest wymagane</span>}

                <label htmlFor="percentage">Wysokość</label>
                <input 
                type="number" 
                min={1} 
                max={100} 
                placeholder="W procentach"
                {...register('percentage', {required: { value: true, message: 'To pole jest wymagane'}})} />
                {errors.percentage?.type === 'required' && <span className="error-span">To pole jest wymagane</span>}

                <label htmlFor="CategoryId">Kategoria</label>
                <input 
                type="number"
                min={1} 
                placeholder="Opcjonalnie (podaj ID)"
                {...register('CategoryId')} />

                <label htmlFor="UserId">Użytkownik</label>
                <input 
                type="number" 
                min={1} 
                placeholder="Opcjonalnie (podaj ID)"
                defaultValue={''}
                {...register('UserId')} />

                <label htmlFor="ProductId">Produkt</label>
                <input 
                type="number" 
                min={1} 
                placeholder="Opcjonalnie (podaj ID)"
                defaultValue={undefined}
                {...register('ProductId')} />
                
                {!(CategoryIdField || UserIdField || ProductIdField) && 
                <span className="error-span">Musisz podać przynajmniej jedno ID</span>
                }

                {(CategoryIdField !== '' && (UserIdField && ProductIdField)) && (
                <span className="error-span">Gdy zniżka dotyczy użytkownika i jednego produktu, pole kategoria musi być puste</span>
                )}

                {(CategoryIdField && ProductIdField) && (
                    <span className="error-span">Zniżka nie może dotyczyć kategorii i produktu jednocześnie</span>
                )}

                {(CategoryIdField && !UserIdField) && (
                    <span className="error-span">Jeśli zniżka dotyczy kategorii, musi też dotyczyć użytkownika</span>
                )}

                <div className="form-buttons">
                        <button onClick={() => goBack()}>Wróć</button>
                        <input type="submit" 
                        disabled={(
                            !(CategoryIdField || UserIdField || ProductIdField) ||
                            (CategoryIdField && ProductIdField) ||
                            (CategoryIdField !== '' && (UserIdField && ProductIdField)) ||
                            (CategoryIdField && !(ProductIdField || UserIdField))
                            )} />
                </div>
            </>
            }
            {
            type === 'delete' && 
            <>
                <h2>Czy na pewno chcesz usunąć?</h2>
                <div className="form-buttons">
                    <button onClick={() => goBack()}>Nie</button>
                    <input type="submit" value='Tak'/>
                </div>
            </>
            }
        </form>
    )
}

export default DiscountForm;