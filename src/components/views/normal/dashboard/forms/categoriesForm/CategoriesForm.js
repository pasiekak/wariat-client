import { useForm } from "react-hook-form";
import categoryActions from "../../../../../../api/categoryActions";

const CategoriesForm = ({type, oldData, goBack, setRefresh, refresh}) => {
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
        setRefresh(!refresh);
        goBack();
    }


    const add = async (data) => {
        let res = await categoryActions.addCategory(data)
        if(res.success) {
            alert('Pomyślnie dodano kategorię')
        } else {
            alert(res.message)
        }
    }

    const edit = async (newData) => {
        let res = await categoryActions.editCategory(oldData.id, newData)
        if(res.success) {
            alert('Pomyślnie edytowano kategorię')
        } else {
            alert(res.message)
        }
    }

    const del = async (data) => {
        let res = await categoryActions.deleteCategory(data.id)
        if(res.success) {
            alert('Pomyślnie usunięto kategorię')
        } else {
            alert(res.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="categoryForm">
            {(type === 'add' || type === 'edit') &&
                <>
                    {type === 'add' && <h2>Dodawanie kategorii</h2>}
                    {type === 'edit' && <h2>Edytowanie kategorii</h2>}

                    <label htmlFor="name">Nazwa kategorii</label>
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

export default CategoriesForm;