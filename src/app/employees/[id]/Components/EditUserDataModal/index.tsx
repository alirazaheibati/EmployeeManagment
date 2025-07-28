import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {toast, Toaster} from "sonner";
import React from "react";
import {Input} from "@/components/ui/input";
import {useFormik} from "formik";
import * as yup from "yup";
import {Address, Employee} from "@/Types";
import {useEmployeeStore} from "@/store";
import {useRouter} from "next/navigation";




interface IProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    employee: Employee
}
const validationSchema = yup.object({

    firstName: yup.string().required('نام خود را وارد کنید  '),
    lastName: yup.string().required('نام خانوادگی خود را وارد کنید '),
    phone: yup.string().required('شماره تماس خود را وارد کنید  '),


})

const EditUserData:React.FC<IProps> = ({open,onOpenChange ,employee}) => {
    const updateEmployee = useEmployeeStore((state) => state.updateEmployee);

    const handleUpdate = (firstName:string,lastName:string,phone:string) => {
        updateEmployee(employee.id, {
            firstName:firstName ,
            lastName: lastName,
            phone: phone
        });

        toast.success("کارمند با موفقیت بروزرسانی شد");
    };

    const formik = useFormik({
        initialValues:{
            firstName: employee.firstName,
            lastName: employee.lastName,
            phone: employee.phone,

        },
        validationSchema,
        onSubmit: (values) => {
            handleUpdate(values.firstName, values.lastName, values.phone);
            onOpenChange(false);
        }
    })


    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange} >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>اطلاعات مورد تایید هست ؟</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        لطفاً اطلاعات خود را وارد کنید.
                    </DialogDescription>
                    <form onSubmit={formik.handleSubmit}>
                        <div  className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">نام :</label>
                                <Input
                                    name='firstName'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">نام خانوادگی :</label>
                                <Input
                                    name='lastName'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">شماره تماس :</label>
                                <Input
                                    name='phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type='tel'
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row items-start">
                            <DialogFooter>
                                <Button type='submit' className='bg-green-500 mt-2 cursor-pointer'>اضافه کردن </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogContent>
                <Toaster position="top-right" richColors/>
            </Dialog>

        </>
    )
}

export default EditUserData