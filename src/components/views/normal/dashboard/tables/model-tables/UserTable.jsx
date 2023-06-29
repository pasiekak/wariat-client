import { useCallback, useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { DateTime } from 'luxon';

const UserTable = ({data}) => {
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
        getCoreRowModel: getCoreRowModel() 
      })
    
    return (
        <div className="UserTable">
            {(data && columns) &&
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
            }
        </div>
    )
}

export default UserTable;