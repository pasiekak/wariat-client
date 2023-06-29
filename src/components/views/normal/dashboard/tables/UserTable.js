import { useEffect, useState, useMemo } from "react";
import { DateTime } from 'luxon';
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';

import FadeLoader from "react-spinners/FadeLoader";
import DataProvider from "../../../../../api/DataProvider";

const UserTable = () => {
    const [data, setData] = useState(null);
    const dataProvider = new DataProvider('users');
    
    const fetchData = async() => {
        let res = await dataProvider.getAll();
        setData(res.body);
        console.log(res.body);
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'ID'
        },
        {
            header: 'Nazwa',
            accessorKey: 'username',
            footer: 'Nazwa'
        },
        {
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email'
        },
        {
            header: 'Data utworzenia',
            accessorKey: 'createdAt',
            footer: 'Data utworzenia',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        },
        {
            header: 'Data modyfikacji',
            accessorKey: 'updatedAt',
            footer: 'Data modyfikacji',
            cell: info => DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED)
        },
        {
            header: 'Uprawnienia',
            accessorKey: 'RoleId',
            footer: 'Uprawnienia',
            cell: info => (info.getValue() === 3) ? 'Klient' 
            : ((info.getValue() === 2) ? 'Moderator' 
            : ((info.getValue() === 1) ? 'Administrator' : 'Inne'))
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <>
            {data !== null ? 
            <div className="UserTable">
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}                        
                    </tbody>
                </table>
            </div> : <FadeLoader/>}
        </>
    )
}

export default UserTable;