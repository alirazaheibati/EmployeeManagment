'use client'


import {Card,  CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useFormik} from "formik";
import * as yup from "yup";
import { login} from "@/services/apis";
import Cookies from "js-cookie";
import React, {useState} from "react";
import {Loader2Icon} from "lucide-react";
import {useRouter} from "next/navigation";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";

const validationSchema = yup.object({
    OTP: yup.string().required("کد تأیید را وارد کنید").length(4, "کد باید ۵ رقمی باشد"),
    national_id:yup.string().required('لطفا کد ملی خود را وارد کنید ')
})

interface StepTwoProps {
    phone: string | undefined;
}


const StepTwo:React.FC<StepTwoProps> = ({phone}) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            OTP: '',
            national_id: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setErrorMessage(null);
            setLoading(true);
            try {
                console.log("Submitting values:", values);
                 const res = await login(values.OTP   , phone);
                console.log(res.data);
                const token = res.data.data.token;

                Cookies.set("token", token, { expires: 1 });
                router.push('/employees');
            } catch (error: any) {
                console.error(error);

                if (error.response && error.response.status === 400) {
                    setErrorMessage(error.response.data?.message || 'ورود ناموفق بود. لطفا اطلاعات را بررسی کنید.');
                } else {
                    setErrorMessage('خطایی در ارتباط با سرور رخ داد. لطفا دوباره تلاش کنید.');
                }
            } finally {
                setLoading(false);
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
                            لطفا کدملی و رمز یکبار مصرف خود را وارد کنید
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div >
                                    <Label >کد OTP</Label>
                                    <div className='flex items-center justify-center'>
                                        <InputOTP maxLength={4}

                                                  value={formik.values.OTP}
                                                  onChange={(value) => formik.setFieldValue('OTP', value)}>
                                            <InputOTPGroup dir='ltr'>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                            </InputOTPGroup>

                                        </InputOTP>
                                    </div>

                                    {formik.touched.OTP && formik.errors.OTP && (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.OTP}</div>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label >کد ملی</Label>
                                    <Input
                                        id="national_id"
                                        type="number"
                                        name='national_id'
                                        value={formik.values.national_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="۴۷۱۱۰۵۴۰۹۱"
                                        required
                                    />
                                    {formik.touched.national_id && formik.errors.national_id && (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.national_id}</div>
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

export default StepTwo;