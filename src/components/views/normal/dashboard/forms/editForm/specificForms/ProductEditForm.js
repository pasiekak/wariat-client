import { useForm } from "react-hook-form";

const ProductEditForm = ({oldData, goBack}) => {
    const { register, handleSubmit, setValue } = useForm({
        mode: 'onChange',
        defaultValues: oldData,
    });

    const onSubmit = data => console.log(data);
    // TODO: Submit do api
    // TODO: Poprawa stylu
    // TODO: Reszta edycji
    // TODO: Dodawanie nowych produktów i userów itd.
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Nazwa produktu</label>
            <input type="text" {...register('name')} />

            <label htmlFor="description">Opis</label>
            <input type="text" {...register('description')} />

            <label htmlFor="price">Cena</label>
            <input type="number" {...register('price')} />

            <input type="submit" />
            <button onClick={() => goBack()}>Wróć</button>
        </form>
    )
}

export default ProductEditForm;