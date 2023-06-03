import { ReactNode } from "react"

type props = {
    children: ReactNode,
    customClass?: string,
}

export default function Modal({ children, customClass }: props) {
    return (
        <div className="relative z-11" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 w-[98%] sm:w-[80%] p-3 sm:p-8">
                        {/* Content */}
                        <div className={customClass}>
                            {children}
                        </div>
                        {/* End of Content */}
                    </div>
                </div>
            </div>
        </div>
    )
}