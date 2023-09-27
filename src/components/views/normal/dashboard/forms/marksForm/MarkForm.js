import { useForm } from "react-hook-form";
import markActions from "../../../../../../api/markActions";

const MarkForm = ({type, oldData, goBack, reloadPage}) => {
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
        reloadPage()
        goBack();
    }


    const add = async (data) => {
        let res = await markActions.addMark(data)
        if(res.success) {
            alert('Pomyślnie dodano markę')
        } else {
            alert(res.message)
        }
    }

    const edit = async (newData) => {
        let res = await markActions.editMark(oldData.id, newData)
        if(res.success) {
            alert('Pomyślnie edytowano markę')
        } else {
            alert(res.message)
        }
    }

    const del = async (data) => {
        let res = await markActions.deleteMark(data.id)
        if(res.success) {
            alert('Pomyślnie usunięto markę')
        } else {
            alert(res.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="markForm">
            {(type === 'add' || type === 'edit') &&
                <>
                    {type === 'add' && <h2>Dodawanie marki</h2>}
                    {type === 'edit' && <h2>Edytowanie marki</h2>}

                    <label htmlFor="name">Nazwa marki</label>
                    <input type="text" {...register('name', { required: { value: true, message: 'To pole jest wymagane' } })} />
                    {errors.name?.type === 'required' && <span className="error-span">To pole jest wymagane</span>}

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

export default MarkForm;