import { useForm } from "react-hook-form";

import discountGroupActions from "../../../../../../api/discountGroupActions";

const DiscountGroupForm = ({type, oldData, goBack, reloadPage}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: oldData,
    });

    const onSubmit = (data) => {
        if (type === 'edit') {
            edit(data)
        } else if (type === 'add') {
            add(data)
        } else if (type === 'delete') {
            del(data)
        }
        reloadPage();
        goBack();
    }
    const add = async (data) => {
        let res = await discountGroupActions.addDiscountGroup(data)
        if(res.success) {
            alert('Pomyślnie dodano zniżkę')
        } else {
            alert(res.message)
        }
    }

    const edit = async (newData) => {
        let res = await discountGroupActions.editDiscountGroup(oldData.id, newData)
        if(res.success) {
            alert('Pomyślnie edytowano zniżkę')
        } else {
            alert(res.message)
        }
    }

    const del = async () => {
        let res = await discountGroupActions.deleteDiscountGroup(oldData.id)
        if(res.success) {
            alert('Pomyślnie usunięto zniżkę')
        } else {
            alert(res.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="discountGroupForm">
            {
            (type === 'add' || type === 'edit') && 
            <>
                {type === 'add' && <h2>Dodawanie grupy zniżki</h2>}
                {type === 'edit' && <h2>Edytowanie grupy zniżki</h2>}

                <label htmlFor="percentage">Wysokość</label>
                <input 
                type="number" 
                min={0} 
                max={100} 
                placeholder="W procentach"
                {...register('percentage', {required: { value: true, message: 'To pole jest wymagane'}})} />
                {errors.percentage?.type === 'required' && <span className="error-span">To pole jest wymagane</span>}


                <div className="form-buttons">
                        <button onClick={() => goBack()}>Wróć</button>
                        <input type="submit" />
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

export default DiscountGroupForm;