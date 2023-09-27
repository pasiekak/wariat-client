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
    'marks': [
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
            header: 'Opublikowane?',
            accessorKey: 'published',
            cell: (info) => {
                return info.getValue() ? 'Tak' : 'Nie'
            }
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
    ],
    'discounts': [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Data ważności',
            accessorKey: 'expires',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATETIME_MED),
        },
        {
            header: 'Wartość',
            accessorKey: 'percentage',
            cell: info => `${info.getValue()} %`
        },
        {
            header: 'Utworzono',
            accessorKey: 'createdAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        },
        {
            header: 'Zmodyfikowano',
            accessorKey: 'updatedAt',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
        },
        {
            header: 'Kategoria',
            accessorKey: 'CategoryId',
        },
        {
            header: 'Użytkownik',
            accessorKey: 'UserId',
        },
        {
            header: 'Produkt',
            accessorKey: 'ProductId',
        },
        {
            header: 'Akcje',
            accessorKey: 'buttons'
        }
    ],  
}

export default columns;