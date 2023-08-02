import { useForm } from "react-hook-form";

import productActions from "../../../../../../api/productActions";

const ProductForm = ({type, oldData, goBack, setRefresh, refresh}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: oldData,
    });

    const onSubmit = (data) => {
        if (type === 'edit') {
            edit(data)
        } else if (type === 'add') {
            add(data)
        }
        setRefresh(!refresh);
    }

    // TODO: Submit do api
    // TODO: Poprawa stylu
    // TODO: Reszta edycji
    // TODO: Dodawanie nowych produktów i userów itd.
    const edit = async (newData) => {
        let res = await productActions.editProduct(oldData.id, newData)
        if(res.success) {
            alert('Pomyślnie edytowano produkt')
        } else {
            alert(res.message)
        }
    }

    const add = async (data) => {
        let res = await productActions.addProduct(data)
        if(res.success) {
            alert('Pomyślnie dodano produkt')
        } else {
            alert(res.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Dodawanie produktu</h2>
            <label htmlFor="name">Nazwa produktu</label>
            <input type="text" {...register('name', { required: { value: true, message: 'To pole jest wymagane' } })} />
            {errors.name?.type === 'required' && <span className="error-span">To pole jest wymagane</span>}

            <label htmlFor="description">Opis</label>
            <input type="text" {...register('description', { required: true })} />
            {errors.description?.type === 'required' && <span className="error-span">To pole jest wymagane</span>}

            <label htmlFor="price">Cena</label>
            <input type="number" {...register('price', { required: true })} />
            {errors.price?.type === 'required' && <span className="error-span">To pole jest wymagane</span>}

            <div className="form-buttons">
                <input type="submit" />
                <button onClick={() => goBack()}>Wróć</button>
            </div>
        </form>
    )
}

export default ProductForm;