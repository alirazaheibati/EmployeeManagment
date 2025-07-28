import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, {useState} from "react"
import {IFormData} from "@/app/employees/new/page";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Employee} from "@/Types";
import {useEmployeeStore} from "@/store";
import {toast, Toaster} from "sonner";
import {useRouter} from "next/navigation";

interface IProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    values: IFormData
}

const NewUserModal: React.FC<IProps> = ({ open, onOpenChange ,values }) => {
    const employees = useEmployeeStore((state) => state.employees)
    const addEmployee = useEmployeeStore((state) => state.addEmployee)
    const router = useRouter()
    const NewUser:Employee = {

        id:employees.length + 1,
        firstName:values.firstName,
        lastName:values.lastName,
        phone:values.phone,
        addresses:[{id:1 , label:values.addressName , value:`${values.city},${values.state},${values.street},${values.bulding}`}],
        salaries:[{id:1 , base:Number(values.salary) , penalty:0 , bonus:0}]
    }
    const handleBtnSubmit = (user:Employee)=>{
        const isPhoneDuplicate = employees.some(emp => emp.phone === user.phone)
        if (isPhoneDuplicate){
            toast.error('این شماره قبلا ثبت نام کرده است ')
            return
        }else {
            addEmployee(user)
            toast.success('کاربر با موفیت ایجاد شد ')
            setTimeout(()=>router.push('/employees'),1000)

        }

    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>اطلاعات مورد تایید هست ؟</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Card className='mb-4'>
                        <CardTitle>
                            <Label className='mr-2 font-bold'>
                                اطلاعات فردی
                            </Label>
                        </CardTitle>
                        <CardContent className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col">
                                <Label className="mb-1 text-sm font-medium">{NewUser.firstName} {NewUser.lastName}</Label>
                                <Label className="mb-1 text-sm font-medium">{NewUser.phone}</Label>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='mb-4'>
                        <CardTitle>
                            <Label className='mr-2 font-bold'>
                                آدرس
                            </Label>
                        </CardTitle>
                        <CardContent className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col">
                                <Label className="mb-1 text-sm font-medium">{NewUser.addresses[0].label}</Label>
                                <Label className="mb-1 text-sm font-medium">{NewUser.addresses[0].value}</Label>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='mb-4'>
                        <CardTitle>
                            <Label className='mr-2 font-bold'>
                                حقوق
                            </Label>
                        </CardTitle>
                        <CardContent className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col">
                                <Label className="mb-1 text-sm font-medium">{NewUser.salaries[0].base.toLocaleString("fa-IR").replace(/٬/g, ",")} ریال</Label>
                            </div>
                        </CardContent>
                    </Card>
                </DialogDescription>
                <div className="flex flex-row items-start">
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">ویرایش </Button>
                    </DialogClose>
                    <Button onClick={()=>handleBtnSubmit(NewUser)} className='bg-green-500 cursor-pointer'>ثبت نام </Button>
                </DialogFooter>
                </div>
            </DialogContent>
            <Toaster position="top-right" richColors/>
        </Dialog>
    )
}

export default NewUserModal