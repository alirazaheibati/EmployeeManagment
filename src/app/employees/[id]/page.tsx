'use client'

import { useParams } from "next/navigation";
import { useEmployeeStore } from "@/store";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import AddressCard from "@/app/employees/[id]/Components/AddressCard";
import UserData from "@/app/employees/[id]/Components/UserData";
import React from "react";
import SalariesBox from "@/app/employees/[id]/Components/SalariesBox";
import { toPersianDigits } from "@/lib/utils";

const EmployeePage = () => {
    const { id } = useParams();
    const idNumber = Number(id);

    const employee = useEmployeeStore((state) => state.getEmployeeById(idNumber));

    if (!employee) return <div>کارمند پیدا نشد</div>;

    const totalSalary = employee.salaries?.reduce((sum, s) => sum + (s.base + s.bonus - s.penalty), 0) ?? 0;
    const totalBonus = employee.salaries?.reduce((sum, s) => sum + s.bonus, 0) ?? 0;
    const totalPenalty = employee.salaries?.reduce((sum, s) => sum + s.penalty, 0) ?? 0;

    return (
        <>
            <div className='grid grid-cols-3 grid-rows-1 gap-2 mb-4'>
                <Card>
                    <CardTitle>
                        <Label className='mr-2 font-extrabold '>
                            مجموع دریافتی
                        </Label>
                    </CardTitle>
                    <CardContent>
                        <Label className='font-bold  text-2xl'>
                            {toPersianDigits(totalSalary.toLocaleString("fa-IR").replace(/٬/g, ",") + " ریال")}
                        </Label>
                    </CardContent>
                </Card>

                <Card>
                    <CardTitle>
                        <Label className='mr-2 font-extrabold'>
                            مجموع پاداش
                        </Label>
                    </CardTitle>
                    <CardContent>
                        <Label className='font-bold text-green-500 text-2xl'>
                            {toPersianDigits(totalBonus.toLocaleString("fa-IR").replace(/٬/g, ",") + " ریال")}
                        </Label>
                    </CardContent>
                </Card>

                <Card>
                    <CardTitle>
                        <Label className='mr-2 font-extrabold'>
                            مجموع کسری
                        </Label>
                    </CardTitle>
                    <CardContent>
                        <Label className='font-bold text-red-600 text-2xl'>
                            {toPersianDigits(totalPenalty.toLocaleString("fa-IR").replace(/٬/g, ",") + " ریال")}
                        </Label>
                    </CardContent>
                </Card>
            </div>

            <div className='grid grid-cols-1 grid-rows-1 gap-2 mb-4'>
                <UserData employee={employee} />
                <AddressCard employeeId={employee.id} />
                <SalariesBox employee={employee}/>
            </div>
        </>
    );
}

export default EmployeePage;