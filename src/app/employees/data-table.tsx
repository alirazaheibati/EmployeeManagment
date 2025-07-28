"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel, getFilteredRowModel,

} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {useState} from "react";
import { Input } from "@/components/ui/input"
import {useRouter} from "next/navigation";

interface DataTableProps<TData extends { id: number | string }, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
columns,
data,
}: DataTableProps<TData, TValue>) {
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const router = useRouter();

    const globalFilterFn = (row:any, columnId:any, filterValue:any) => {
        const search = filterValue.toLowerCase();
        return (
            row.original.name.toLowerCase().includes(search) ||
            row.original.family.toLowerCase().includes(search) ||
            row.original.phone.toLowerCase().includes(search)
        );
    };
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilterValue,

        state: {
            globalFilter: globalFilterValue,
        },

    })
    return (
        <>
            <div className="max-w-[300px] mb-4">
            <Input
                placeholder="جست‌وجو در نام یا نام خانوادگی..."
                value={globalFilterValue}
                onChange={(e) => setGlobalFilterValue(e.target.value)}
            />
            </div>
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead className='text-center font-bold' key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="cursor-pointer"
                                onClick={() => {
                                    router.push(`/employees/${row.original.id}`);
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell className='text-center ' key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    <div className="flex items-center justify-start space-x-2 py-4">
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            بعدی
        </Button>
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            قبلی
        </Button>
    </div>
        </>
    )
}