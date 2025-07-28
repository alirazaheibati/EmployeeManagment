import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";


const DashboardLayout = ({
                             children,
                         }: Readonly<{
    children: React.ReactNode;
}>)=>{

    return (
        <div className="h-screen w-full">
            <ResizablePanelGroup
                direction="vertical"
                className="h-full w-full rounded-lg border"
            >
                <ResizablePanel defaultSize={12}>
                    <div className="flex flex-col justify-end h-full p-6 bg-gray-50">
                        <h1 className="font-bold mb-2 text-2xl">داشبورد مدیریت کابران </h1>
                        <p className="text-gray-600">به داشبورد مدیریت کارمندان خوش آمدید!</p>
                    </div>
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