import { useForm } from 'react-hook-form';
import sort from "./sortingFunctions";

import './sorting-form.css';

const SortingForm = ({setOrders}) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            sortingColumn: 'createdAt',
            sortingDirection: 'asc'
        },
    });

    const submitHandler = (data) => {
        setOrders((previousOrders) => { 
            return sort(data.sortingColumn, previousOrders, data.sortingDirection);
        });
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <h5>Sortowanie</h5>
            <section className="sortingColumn">
                <select {...register('sortingColumn')}>
                    <option value='id'>ID</option>
                    <option value='email'>Email</option>
                    <option value='status'>Status</option>
                    <option value='total'>Kwota</option>
                    <option value='createdAt'>Data złożenia</option>
                </select>
            </section>
            <section className="sortingDirection">
                <label htmlFor="sortingDirection">Rosnąco
                <input type="radio" value='asc' {...register('sortingDirection')}/>
                </label>
                <label htmlFor="sortingDirection">Malejąco
                <input type="radio" value='desc' {...register('sortingDirection')}/>
                </label>
            </section>
            <section>
                <input type="submit" value="Sortuj"/>
            </section>
        </form>
    )
}

export default SortingForm;