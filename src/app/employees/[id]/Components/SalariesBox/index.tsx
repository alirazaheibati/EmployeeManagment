'use client'

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import NewAddressmodal from "@/app/employees/[id]/Components/NewAddressmodal";
import { Toaster } from "@/components/ui/sonner";
import {columns} from "@/app/employees/[id]/Components/SalariesBox/columns";
import {useEmployeeStore} from "@/store";
import {Employee} from "@/Types";
import {DataTable} from "@/app/employees/[id]/Components/SalariesBox/data-table";
import {MdEdit} from "react-icons/md";
import {Button} from "@/components/ui/button";
import {FaPlus} from "react-icons/fa";
import NewSalaryModal from "@/app/employees/[id]/Components/NewSalary";

interface IProps {
    employee: Employee;
}

const SalariesBox: React.FC<IProps> = ({ employee }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const updateEmployee = useEmployeeStore((state) => state.updateEmployee);


    return (
        <>
            <Card className='mb-4'>
                <CardTitle className='flex flex-row justify-between '>
                    <Label className='mr-2 font-extrabold text-2xl'>
                        حقوق و دستمزد
                    </Label>
                    <Button onClick={()=>setShowModal(true)} variant='outline' className='ml-10 cursor-pointer'>
                        <FaPlus />افزودن دستمزد
                    </Button>
                </CardTitle>

                <CardContent className="">
                    <DataTable columns={columns} data={employee.salaries} />

                </CardContent>
            </Card>

            {showModal && (
                <NewSalaryModal
                    open={showModal}
                    onOpenChange={setShowModal}
                    employee={employee}
                />
            )}

            <Toaster richColors position='top-right' />
        </>
    );
};

export default SalariesBox;