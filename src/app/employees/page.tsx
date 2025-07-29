'use client'


import {Button} from "@/components/ui/button";
import {FaPlus, FaTrash} from "react-icons/fa";
import {DataTable} from "@/app/employees/data-table";
import {columns, TableCell} from "@/app/employees/columns";
import Link from "next/link";
import {useEmployeeStore} from "@/store";
import ProtectedRoute from "@/app/login/components/ProtectedRoute";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";




const EmployeesPage = ()=>{
    const employees = useEmployeeStore((state) => state.employees)

    const pageData = employees;
    return (
        <>
            <ProtectedRoute>
            <div className='w-full'>
                <Link href='/employees/new'>
                <Button  className='cursor-pointer'>
                    <FaPlus />اضافه کردن کاربر جدید
                </Button>
                </Link>

            </div>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={pageData} />
            </div>
            </ProtectedRoute>
        </>
    )
}

export default EmployeesPage;