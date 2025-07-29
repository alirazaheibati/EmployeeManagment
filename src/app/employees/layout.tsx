'use client'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {FaTrash} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";


const DashboardLayout = ({
                             children,
                         }: Readonly<{
    children: React.ReactNode;
}>)=>{
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("token");
        router.push("/login");
    };
    return (
        <div className="h-screen w-full">
            <ResizablePanelGroup
                direction="vertical"
                className="h-full w-full rounded-lg border"
            >
                <ResizablePanel defaultSize={12} className='flex justify-between items-center bg-gray-50 '>
                    <div className="flex flex-col justify-end h-full p-6 ">
                        <h1 className="font-bold mb-2 text-2xl">داشبورد مدیریت کابران </h1>
                        <p className="text-gray-600">به داشبورد مدیریت کارمندان خوش آمدید!</p>
                    </div>
                    <Button onClick={()=>handleLogout()}  className='cursor-pointer ml-2'>
                        خروج
                    </Button>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={88}>
                    <div className="h-full min-h-0 p-6 overflow-auto">
                        {children}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default DashboardLayout;