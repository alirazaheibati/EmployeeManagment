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

    addressName: yup.string().required('عنوان آدرس را وارد کنید '),
    city: yup.string().required('شهر خود را وارد کنید'),
    state: yup.string().required('منطقه خود را وارد کنید '),
    street: yup.string().required('خیابات خود را وارد کنید '),
    bulding: yup.string().required('پلاک و واحد خود را وارد کنید '),

})

const NewAddressmodal:React.FC<IProps> = ({open,onOpenChange ,employee}) => {
    const router = useRouter()
    const addAddress = useEmployeeStore((state) => state.addAddress);

    const handleAddAddress = (label:string , value:string) => {
        const newAddress: Address = {
            id:employee.addresses.length + 1,
            label: label,
            value: value
        };
        const employeeId = employee.id;
        addAddress(employeeId, newAddress);
    };

    const formik = useFormik({
        initialValues:{
            addressName: '',
            city: '',
            state: '',
            street: '',
            bulding: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const fullAddress = `${values.city}, ${values.state}, ${values.street}, ${values.bulding}`;
            handleAddAddress(values.addressName, fullAddress);
            toast.success('آدرس با موفقیت ثبت شد ')
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
                        لطفاً اطلاعات آدرس را وارد کنید.
                    </DialogDescription>
                    <form onSubmit={formik.handleSubmit}>
                        <div  className="grid grid-cols-1 gap-6">
                            <div className="flex flex-col">
                                <label className="mb-1 mr-2 text-sm font-medium">عنوان آدرس :</label>
                                <Input
                                    name='addressName'
                                    value={formik.values.addressName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.addressName && formik.errors.addressName && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.addressName}</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm mr-2 font-medium">شهر :</label>
                                <Input
                                    name='city'
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.city && formik.errors.city && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm mr-2 font-medium">منطقه :</label>
                                <Input
                                    name='state'
                                    value={formik.values.state}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.state && formik.errors.state && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.state}</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm mr-2 font-medium">خیابان :</label>
                                <Input
                                    name='street'
                                    value={formik.values.street}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.street && formik.errors.street && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.street}</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm mr-2 font-medium">پلاک و واحد :</label>
                                <Input
                                    name='bulding'
                                    value={formik.values.bulding}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.bulding && formik.errors.bulding && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.bulding}</div>
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

export default NewAddressmodal