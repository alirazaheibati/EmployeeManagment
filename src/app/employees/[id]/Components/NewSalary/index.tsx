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
    base: yup.number().required('حقوق پایه را وارد کنید ').transform((value, originalValue) => originalValue === '' ? undefined : Number(originalValue)),
    bonus: yup.number().transform((value, originalValue) => originalValue === '' ? undefined : Number(originalValue)),
    penalty: yup.number().transform((value, originalValue) => originalValue === '' ? undefined : Number(originalValue)),


})

const NewSalaryModal:React.FC<IProps> = ({open,onOpenChange ,employee}) => {
    const addSalary = useEmployeeStore((state) => state.addSalary);
    const handleAddSalary = (base:number,bonus:number,penalty:number) => {
        addSalary(employee.id, {
            id:employee.salaries.length+1 ,
            base: base,
            bonus: bonus,
            penalty:penalty
        });

    };

    const formik = useFormik({
        initialValues:{
            base: '',
            bonus: '',
            penalty: '',

        },
        validationSchema,
        onSubmit: (values) => {
            handleAddSalary(Number(values.base), Number(values.bonus), Number(values.penalty));
            toast.success('حقوق موفقیت ثبت شد ')
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
                        لطفاً اطلاعات حقوق را وارد کنید.
                    </DialogDescription>
                    <form onSubmit={formik.handleSubmit}>
                        <div  className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col">
                                <label className="mb-1 mr-2 text-sm font-medium">پایه حقوق :</label>
                                <Input
                                    name='base'
                                    value={formik.values.base}
                                    onChange={(e) => {
                                        const persianToEnglish = (str: string) =>
                                            str.replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728))
                                        const val = persianToEnglish(e.target.value)
                                        formik.setFieldValue("base", val)
                                    }}
                                    inputMode="numeric"
                                    type="text"
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.bonus && formik.errors.bonus && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.bonus}</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm mr-2 font-medium">پاداش :</label>
                                <Input
                                    name='bonus'
                                    value={formik.values.bonus}
                                    onChange={(e) => {
                                        const persianToEnglish = (str: string) =>
                                            str.replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728))
                                        const val = persianToEnglish(e.target.value)
                                        formik.setFieldValue("bonus", val)
                                    }}
                                    inputMode="numeric"
                                    type="text"
                                />

                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm mr-2 font-medium">جریمه  :</label>
                                <Input
                                    name='penalty'
                                    value={formik.values.penalty}
                                    onChange={(e) => {
                                        const persianToEnglish = (str: string) =>
                                            str.replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728))
                                        const val = persianToEnglish(e.target.value)
                                        formik.setFieldValue("penalty", val)
                                    }}
                                    inputMode="numeric"
                                    type="text"
                                />

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

export default NewSalaryModal