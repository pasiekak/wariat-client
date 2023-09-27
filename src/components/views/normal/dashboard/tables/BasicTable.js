import { useEffect, useState } from "react";
import { getCoreRowModel, useReactTable, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';

import allColumns from "./columns";
import FadeLoader from "react-spinners/FadeLoader";
import CategorySelect from "../tableAssets/CategorySelect";

import DataProvider from "../../../../../api/DataProvider";
import categoryActions from "../../../../../api/categoryActions";

import './table-style.css';
import Overlay from "../forms/Overlay";

const BaseTable = ({tableName}) => {
    const [data, setData] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [categoryNames, setCategoryNames] = useState(null);
    const columns = allColumns[tableName];

    const [overlayOptions, setOverlayOptions] = useState({ 
        type: null,
        tableName: null,
        oldData: null,
        goBack: null,
        reloadPage: null,
    });
    const [overlayDisplay, setOverlayDisplay] = useState(false);

    const reloadPage = () => {
        console.log('IM RELOADING');
        setRefresh(!refresh);
    }

    const hideOverlay = () => {
        setOverlayDisplay(false);
    }
    
    useEffect(() => {
        const dataProvider = new DataProvider(tableName);
        const fetchData = async () => {
            if (tableName === 'products') {
                let res = await categoryActions.getCategoryNames()
                setCategoryNames(res.body)
            }
            let res = await dataProvider.getAll()
            setData(res.body)
        }
        fetchData()
    }, [tableName, refresh])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    })
    return (
        <>
            {data !== null ? 
            <div className="BasicTable">
                <div className="table-wrapper">
                    <table>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th 
                                        key={header.id} 
                                        onClick={header.column.getToggleSortingHandler()}>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                {asc: ' /\\', desc: ' \\/'}[header.column.getIsSorted() ?? null]
                                            }
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
                                            {
                                                cell.column.columnDef.accessorKey === 'productCategories' ? 
                                                <CategorySelect categoryNames={categoryNames} productId={cell.row.original.id}/> :
                                                    cell.column.columnDef.accessorKey === 'buttons' ? 
                                                    <div className="table-buttons">
                                                        <button id="editButton" onClick={() => {
                                                            setOverlayOptions({
                                                                type: 'edit',
                                                                tableName: tableName,
                                                                oldData: row.original,
                                                                goBack: hideOverlay,
                                                                reloadPage: reloadPage 
                                                            })
                                                            setOverlayDisplay(true)
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                            </svg>
                                                        </button>
                                                        <button id="deleteButton" onClick={async () => {
                                                            setOverlayOptions({
                                                                type: 'delete',
                                                                tableName: tableName,
                                                                oldData: row.original,
                                                                goBack: hideOverlay,
                                                                reloadPage: reloadPage
                                                            })
                                                            setOverlayDisplay(true)
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                                            </svg>
                                                        </button>
                                                        {tableName === 'products' && 
                                                        <button id="galleryButton" onClick={async () => {
                                                            setOverlayOptions({
                                                                type: 'singleProductGallery',
                                                                tableName: tableName,
                                                                oldData: row.original,
                                                                goBack: hideOverlay,
                                                                reloadPage: reloadPage
                                                            })
                                                            setOverlayDisplay(true);
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16">
                                                                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                                                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
                                                            </svg>
                                                        </button>
                                                        }
                                                    </div> : 
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}                        
                        </tbody>
                    </table>
                    <div className="buttons-wrapper">
                        <div className="buttons">
                            <div className="top-buttons">
                                <button onClick={() => table.setPageIndex(0)}>Pierwsza strona</button>
                                <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Poprzednia strona</button>
                                <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Następna strona</button>
                                <button onClick={() => table.setPageIndex(table.getPageCount()-1)}>Ostatnia strona</button>
                            </div>
                            <div className="search">
                                <label htmlFor="filter">Wyszukiwarka</label>
                                <input 
                                    type="text" 
                                    value={filtering} 
                                    onChange={(e) => setFiltering(e.target.value)}
                                />                    
                            </div>
                            <div className="bottom-buttons">
                                <button onClick={() => {
                                    setOverlayOptions({
                                        type: 'add',
                                        tableName: tableName,
                                        oldData: null,
                                        goBack: hideOverlay,
                                        reloadPage: reloadPage  
                                    })
                                    setOverlayDisplay(true)
                                }}>Dodaj</button>                        
                            </div>                        
                        </div>
                    </div>
                </div>
                {overlayDisplay && <Overlay overlayOptions={overlayOptions}/>}
            </div>
             : <FadeLoader/>}
        </>
    )
}

export default BaseTable;