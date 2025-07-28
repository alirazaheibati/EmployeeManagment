"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Salary} from "@/Types";
import { toPersianDigits } from "@/lib/utils";

export type TableCell = {
    id: string
    firstName: string
    lastName: string
    phone: string
    salaries: Salary[]
}

export const columns: ColumnDef<TableCell>[] = [
    {
        accessorKey: "firstName",
        header: "نام",
    },
    {
        accessorKey: "lastName",
        header: "نام خانوادگی ",
    },
    {
        accessorKey: "phone",
        header: "شماره تماس",
        cell: ({ getValue }) => {
            const phone = getValue() as string
            const persianPhone = toPersianDigits(phone)
            return <span className="font-medium">{persianPhone}</span>
        },
    },
    {
        accessorKey: "base",
        header: "مجموع درآمد",
        cell: ({ row }) => {
            const total = row.original.salaries?.reduce((sum, s) => sum + (s.base + s.bonus - s.penalty), 0) ?? 0
            const formatted = new Intl.NumberFormat("fa-IR")
                .format(total)
                .replace(/٬/g, ",") + " ریال"
            return <div className="font-medium text-green-500">{toPersianDigits(formatted)}</div>
        },
    },
    {
        accessorKey: "penalty",
        header: "مجموع جریمه",
        cell: ({ row }) => {
            const total = row.original.salaries?.reduce((sum, s) => sum + s.penalty, 0) ?? 0
            const formatted = new Intl.NumberFormat("fa-IR")
                .format(total)
                .replace(/٬/g, ",") + " ریال"
            return <div className="font-medium text-red-600">{toPersianDigits(formatted)}</div>
        },
    },


]