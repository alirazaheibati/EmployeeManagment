'use client'

import {useState, useEffect} from "react";
import StepOne from "@/app/login/stepOne/page";
import StepTwo from "@/app/login/stepTwo/page";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";


export enum LoginStep {
    Inquiry = 0,
    Verify = 1,
}
interface State {
    user_mobile?: string | undefined;
}
const LoginPage: React.FC = () => {
    const [step, setStep] = useState<LoginStep>(LoginStep.Inquiry);
    const [state , setState] = useState<State>({});
    const router = useRouter();

    useEffect(() => {
        if (state?.user_mobile) {
            setStep(LoginStep.Verify);
        }
    }, [state?.user_mobile]);
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            router.push("/employees");
        }
    }, []);

    return (
        <>
            {(() => {
                switch (step) {
                    case LoginStep.Inquiry:
                        return (
                                    <StepOne
                                        initialValue={{  phone: state?.user_mobile }}
                                        onNextStep={(data) => {
                                            setState((prevState) => ({ ...prevState, ...data }));
                                        }}
                                    />
                        );

                    case LoginStep.Verify:
                        return (
                                    <StepTwo phone={state?.user_mobile} />
                        );
                }
            })()}
        </>
    );
};
export default LoginPage;