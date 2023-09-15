import { DateTime } from 'luxon';

const columns = {
    'users': [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Nazwa',
            accessorKey: 'username',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Imię',
            accessorKey: 'firstName',
        },
        {
            header: 'Nazwisko',
            accessorKey: 'lastName',
        },
        {
            header: 'Data utworzenia',
            accessorKey: 'createdAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        },
        {
            header: 'Data modyfikacji',
            accessorKey: 'updatedAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        },
        {
            header: 'Uprawnienia',
            accessorKey: 'RoleId',
            cell: info => (info.getValue() === 3) ? 'Klient' 
            : ((info.getValue() === 2) ? 'Moderator' 
            : ((info.getValue() === 1) ? 'Administrator' : 'Inne'))
        },
        {
            header: 'ID adresu',
            accessorKey: 'AddressId',
        },
        {
            header: 'Akcje',
            accessorKey: 'buttons'
        }
    ],
    'categories': [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Nazwa',
            accessorKey: 'name',
        },
        {
            header: 'Akcje',
            accessorKey: 'buttons'
        }
    ],
    'images': [
        {
            header: 'ID',
            accessorKey: 'id',
        },
    ],
    'products': [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Nazwa',
            accessorKey: 'name',
        },
        {
            header: 'Opis',
            accessorKey: 'description',
        },
        {
            header: 'Cena',
            accessorKey: 'price',
        },
        {
            header: 'Data utworzenia',
            accessorKey: 'createdAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        },
        {
            header: 'Data modyfikacji',
            accessorKey: 'updatedAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        },
        {
            header: 'Kategorie',
            accessorKey: 'productCategories'
        },
        {
            header: 'Akcje',
            accessorKey: 'buttons'
        }
    ]   
}

export default columns;