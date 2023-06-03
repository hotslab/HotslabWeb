import Spinner from "@/components/Spinner"
import Skeleton from "@/components/Skeleton"

type Props = { isPageLoad?: boolean }

export default function LoadingPage({ isPageLoad = true }: Props) {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-white bg-opacity-100 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center items-center">
                    <div className="relative transform overflow-hidden bg-white text-left transition-all w-full">
                        {isPageLoad ? <Skeleton /> : <Spinner />}
                    </div>
                </div>
            </div>
        </div>
    )
}