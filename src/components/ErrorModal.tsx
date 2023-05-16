type props = { errorMessage: string, close: Function }

export default function ErrorModal({ errorMessage, close }: props) {
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <div className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 w-[98%] sm:w-[80%] p-3 sm:p-8">
                        {/* Content */}
                        <div className="flex flex-col justify-between items-start flex-wrap gap-5">
                            <h2 className="text-error font-md text-xl">Error</h2>
                            <span className="text-gray-600 text-md">{errorMessage}</span>
                            <div className='w-full flex justify-end items-center'>
                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => close()}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        {/* End of Content */}
                    </div>
                </div>
            </div>
        </div>
    )
}