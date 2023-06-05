type Props = { isSiteLevel?: boolean }

export default function Skeleton({ isSiteLevel = true }: Props) {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-start items-center">
            {isSiteLevel && <div className="h-[65px] w-full bg-gray-300 animate-pulse"></div>}
            <div className="w-full container mx-auto py-10 px-4">
                <div className="w-full mb-10 h-[65px] bg-gray-300 animate-pulse" />
                <div className="w-full min-h-screen bg-gray-300 animate-pulse" />
            </div>
        </div>
    )
}