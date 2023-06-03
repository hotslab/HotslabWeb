type Props = { isSiteLevel?: boolean }

export default function Skeleton({ isSiteLevel = true }: Props) {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-start items-center">
            {isSiteLevel && <div className="h-[65px] w-full bg-gray-300 animate-pulse"></div>}
            <div className="w-full grid sm:grid-cols-2 gap-5 container mx-auto py-10 px-4">
                <div className="w-full min-h-screen flex flex-col justify-between items-center gap-3 mx-0">
                    <div className="h-[20%] w-full flex justify-between items-center gap-3">
                        <div className="bg-gray-300 h-full w-1/3 animate-pulse"></div>
                        <div className="h-full w-2/3 flex flex-col justify-between items-center gap-1">
                            <div className="bg-gray-300 h-[50%] w-full animate-pulse"></div>
                            <div className="bg-gray-300 h-[50%] w-full animate-pulse"></div>
                        </div>
                    </div>
                    <div className="bg-gray-300 h-[10%] w-full animate-pulse"></div>
                    <div className="bg-gray-300 h-[20%] w-full animate-pulse"></div>
                    <div className="bg-gray-300 h-[20%] w-full animate-pulse"></div>
                    <div className="bg-gray-300 h-[30%] w-full animate-pulse"></div>
                </div>
                <div className="w-full bg-gray-300 min-h-screen animate-pulse"></div>
            </div>
        </div>

    )
}