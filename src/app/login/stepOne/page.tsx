'use client'


import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useFormik} from "formik";
import * as yup from "yup";
import {getOtp} from "@/services/apis";
import React, {useState} from "react";
import {Loader2Icon} from "lucide-react";

const validationSchema = yup.object({
    user_mobile: yup.string().required('لطفا شماره تماس خود رو وارد کنید ')
        .matches(/^(\+98|0)?9\d{9}$/, 'شماره موبایل معتبر نیست'),
})

interface StepOneProps {
    initialValue: {
        phone: string | undefined;
    };
    onNextStep: (data: { user_mobile: string }) => void;
}



const StepOne:React.FC<StepOneProps> = ({initialValue , onNextStep}) => {
const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formik = useFormik({
        initialValues:{
            user_mobile: initialValue.phone || ''
        },
        validationSchema,
        onSubmit: async (values,) => {
            if (values.user_mobile && values.user_mobile.length > 0){
                try {
                    setErrorMessage(null);
                    console.log(values);
                    setLoading(true);
                    await getOtp(values.user_mobile);
                    onNextStep({ user_mobile: values.user_mobile });
                } catch (error: any) {
                    console.log(error);

                    if (error.response && error.response.status === 400) {
                        setErrorMessage(error.response.data?.message || 'شماره وارد شده معتبر نیست.');
                    } else {
                        setErrorMessage('خطایی در ارتباط با سرور رخ داد. لطفا دوباره تلاش کنید.');
                    }
                } finally {
                    setLoading(false);
                }
            }
            else {
                console.log('aaaa');
            }
        }
    })

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>به صفحه ورود خوش آمدید</CardTitle>
                    <CardDescription>
                        لطفا شماره تماس خود را وارد کنید
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit(e);
                    }}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label >شماره تماس</Label>
                                <Input
                                    id="user_mobile"
                                    type="tel"
                                    name='user_mobile'
                                    value={formik.values.user_mobile}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="۰۹۱۲۹۳۳۸۱۶۶۶۷۲"
                                    required
                                />
                                {formik.touched.user_mobile && formik.errors.user_mobile && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.user_mobile}</div>
                                )}
                            </div>
                        </div>
                        {errorMessage && (
                          <div className="text-red-600 text-sm mt-2 text-center">
                            {errorMessage}
                          </div>
                        )}
                        <CardFooter className='mt-4 p-0'>
                            {loading ?<Button className="w-full p-0" disabled>
                                <Loader2Icon className="animate-spin" />
                                ارسال کد
                            </Button>
                                :
                                <Button type="submit" className="w-full p-0" >
                                ورود
                            </Button> }


                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            </div>
        </>
    )
}

export default StepOne;