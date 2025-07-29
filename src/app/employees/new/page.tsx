'use client'

import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import NewUserModal from "./Components/newUserModal";
import ProtectedRoute from "@/app/login/components/ProtectedRoute";


const validationSchema = yup.object({
    firstName: yup.string().required("لطفا نام خود را وارد کنید"),
    lastName: yup.string().required('لطفا نام خانوادگی خود را وارد کنید '),
    phone: yup.string().required('لطفا شماره تماس خود رو وارد کنید ')
        .matches(/^(\+98|0)?9\d{9}$/, 'شماره موبایل معتبر نیست'),
    addressName: yup.string().required('عنوان آدرس را وارد کنید '),
    city: yup.string().required('شهر خود را وارد کنید'),
    state: yup.string().required('منطقه خود را وارد کنید '),
    street: yup.string().required('خیابات خود را وارد کنید '),
    bulding: yup.string().required('پلاک و واحد خود را وارد کنید '),
    salary: yup
        .number()
        .transform((value, originalValue) => originalValue === '' ? undefined : Number(originalValue))
        .typeError('حقوق باید عدد باشد')
        .required('حقوق دریافتی را وارد کنید')

})
export interface IFormData {
    firstName: string;
    lastName: string;
    phone: string;
    addressName: string;
    city: string;
    state: string;
    street: string;
    bulding: string;
    salary: string ;
}


const NewEmployees = ()=>{
    const [user,setUser] = useState<IFormData>()
    const [showModal,setShowModal] = useState<boolean>(false)

    const formik = useFormik({
        initialValues:{
            firstName: '',
            lastName: '',
            phone: '',
            addressName: '',
            city: '',
            state: '',
            street: '',
            bulding: '',
            salary: ''
        },
        validationSchema,
        onSubmit:  (values) => {
            setUser(values)
            setShowModal(true)
        }
    })

    return (
        <>
        <ProtectedRoute>
            <form onSubmit={formik.handleSubmit}>
            <div>
                <Card className='mb-4'>
                    <CardTitle>
                        <span className='mr-2'>
                            اطلاعات عمومی
                        </span>
                    </CardTitle>
                    <CardContent className="grid grid-cols-3 gap-6">
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
                    </CardContent>
                </Card>
            </div>
            <div className='mb-4'>
                <Card>
                    <CardTitle>
                        <span className='mr-2'>
                            آدرس
                        </span>
                    </CardTitle>
                    <CardContent className="grid grid-cols-3 gap-6">
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">عنوان آدرس :</label>
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
                            <label className="mb-1 text-sm font-medium">شهر :</label>
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
                            <label className="mb-1 text-sm font-medium">منطقه :</label>
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
                            <label className="mb-1 text-sm font-medium">خیابان :</label>
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
                            <label className="mb-1 text-sm font-medium">پلاک و واحد :</label>
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
                    </CardContent>
                </Card>
            </div>
            <div className='mb-4'>
                <Card>
                    <CardTitle>
                        <span className='mr-2'>
                            حقوق
                        </span>
                    </CardTitle>
                    <CardContent className="grid grid-cols-3 gap-6">
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">حقوق دریافتی :</label>
                            <Input
                                name="salary"
                                value={formik.values.salary}
                                onChange={(e) => {
                                  const persianToEnglish = (str: string) =>
                                    str.replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728))
                                  const val = persianToEnglish(e.target.value)
                                  formik.setFieldValue("salary", val)
                                }}
                                onBlur={formik.handleBlur}
                                inputMode="numeric"
                                type="text"
                            />
                            {formik.touched.salary && formik.errors.salary && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.salary}</div>
                            )}
                        </div>

                    </CardContent>
                </Card>
            </div>
            <Button  type='submit' className='bg-green-500 cursor-pointer  font-bold w-full'>
                ایجاد کاربر
            </Button>
            </form>
            {user && (
                <NewUserModal open={showModal} onOpenChange={setShowModal} values={user} />
            )}
        </ProtectedRoute>
        </>
    )
}

export default NewEmployees;