"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");

        if (!token) {
            router.push("/login");
        } else {
            setIsChecked(true);
        }
    }, []);

    if (!isChecked) return null;

    return <>{children}</>;
}