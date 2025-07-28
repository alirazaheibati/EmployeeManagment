"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Salary} from "@/Types";
import { toPersianDigits } from "@/lib/utils";


export const columns: ColumnDef<Salary>[] = [
    {
        accessorKey: "base",
        header: "پایه حقوق",
        cell: ({ getValue }) => {
            const value = getValue() as number
            const formatted = new Intl.NumberFormat("fa-IR")
                .format(value)
                .replace(/٬/g, ",") + " ریال"
            return <div className="font-medium ">{toPersianDigits(formatted)}</div>
        },
    },
    {
        accessorKey: "bonus",
        header: "پاداش",
        cell: ({ getValue }) => {
            const value = getValue() as number
            const formatted = new Intl.NumberFormat("fa-IR")
                .format(value)
                .replace(/٬/g, ",") + " ریال"
            return <div className="font-medium text-green-500">{toPersianDigits(formatted)}</div>
        },
    },
    {
        accessorKey: "penalty",
        header: "جریمه ",
        cell: ({ getValue }) => {
            const value = getValue() as number
            const formatted = new Intl.NumberFormat("fa-IR")
                .format(value)
                .replace(/٬/g, ",") + " ریال"
            return <div className="font-medium text-red-600">{toPersianDigits(formatted)}</div>
        },
    },
    {
        header: "مجموع درآمد",
        cell: ({ row }) => {
            const salary = row.original
            const base = salary.base ?? 0
            const bonus = salary.bonus ?? 0
            const penalty = salary.penalty ?? 0

            const total = (base + bonus) - penalty
            const formatted = new Intl.NumberFormat("fa-IR")
                .format(total)
                .replace(/٬/g, ",") + " ریال"
            return <div className="font-medium">{toPersianDigits(formatted)}</div>
        },
    }



]