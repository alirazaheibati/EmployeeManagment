import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Employee} from "@/Types";
import {Button} from "@/components/ui/button";
import {MdEdit} from "react-icons/md";
import NewAddressmodal from "@/app/employees/[id]/Components/NewAddressmodal";
import React, {useState} from "react";
import EditUserData from "@/app/employees/[id]/Components/EditUserDataModal";
import { toPersianDigits } from "@/lib/utils";

interface IProps {
    employee: Employee
}

const UserData:React.FC<IProps> =({employee})=>{
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <Card className='mb-4'>
                <CardTitle className='flex justify-between flex-row'>
                    <Label className='mr-2 font-extrabold text-2xl'>
                        اطلاعات عمومی
                    </Label>
                    <Button onClick={()=>setShowModal(true)} variant='outline' className='ml-10 cursor-pointer'>
                        <MdEdit />
                    </Button>
                </CardTitle>
                <CardContent className="grid grid-cols-3 gap-6">
                    <div className="flex flex-row">
                        <Label className="mb-1 font-semibold text-xl ml-2">نام :</Label>
                        <Label className="mb-1 text-xl ">{employee.firstName}</Label>
                    </div>
                    <div className="flex flex-row">
                        <Label className="mb-1 text-xl font-semibold ml-2">نام خانوادگی :</Label>
                        <Label className="mb-1 text-xl ">{employee.lastName}</Label>

                    </div>
                    <div className="flex flex-row">
                        <Label className="mb-1 text-xl  font-semibold ml-2">شماره تماس :</Label>
                        <Label className="mb-1 text-xl ">{toPersianDigits(employee.phone)}</Label>
                    </div>
                </CardContent>
            </Card>
            {showModal && (
                <EditUserData
                    open={showModal}
                    onOpenChange={setShowModal}
                    employee={employee}
                />
            )}
        </>
    )
}

export default UserData;