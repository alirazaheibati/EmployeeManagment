'use client'

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaPlus, FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import NewAddressmodal from "@/app/employees/[id]/Components/NewAddressmodal";
import { useEmployeeStore } from "@/store";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface IProps {
    employeeId: number;
}

const AddressCard: React.FC<IProps> = ({ employeeId }) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const removeAddress = useEmployeeStore((state) => state.removeAddress);
    const employee = useEmployeeStore((state) => state.getEmployeeById(employeeId));

    if (!employee) return <div>کارمند پیدا نشد</div>;

    const handleRemoveAddress = (addressId: number) => {
        const result = removeAddress(employeeId, addressId);

        if (result === true) {
            toast.success("آدرس حذف شد");
        } else {
            toast.error("هر کاربر باید حداقل یک آدرس داشته باشه");
        }
    };

    return (
        <>
            <Card className='mb-4'>
                <CardTitle>
                    <Label className='mr-2 font-extrabold text-2xl'>
                        آدرس‌ها
                    </Label>
                </CardTitle>

                <CardContent className="grid grid-cols-1 gap-6">
                    {employee.addresses.map((address) => (
                        <Card key={address.id}>
                            <CardTitle className='mr-2'>
                                {address.label}
                            </CardTitle>
                            <CardContent className='flex flex-row justify-between items-center'>
                                <span>{address.value}</span>
                                <Button
                                    variant='outline'
                                    className='border-red-500 hover:bg-red-500 hover:text-white cursor-pointer'
                                    onClick={() => handleRemoveAddress(address.id)}
                                >
                                    <FaTrash />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}

                    <Button onClick={() => setShowModal(true)} className='cursor-pointer'>
                        افزودن آدرس جدید <FaPlus />
                    </Button>
                </CardContent>
            </Card>

            {showModal && (
                <NewAddressmodal
                    open={showModal}
                    onOpenChange={setShowModal}
                    employee={employee}
                />
            )}

            <Toaster richColors position='top-right' />
        </>
    );
};

export default AddressCard;