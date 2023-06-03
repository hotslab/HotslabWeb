import DOMPurify from "isomorphic-dompurify"
import Modal from "@/components/Modal"

type Props = { errorMessage: string, close: Function }

export default function ErrorModal({ errorMessage, close }: Props) {
    return (
        <Modal>
            <div className="flex flex-col justify-between items-start flex-wrap gap-5">
                <h2 className="text-error font-md text-xl">Error</h2>
                <div
                    className="text-gray-600 text-md"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(errorMessage) }}
                />
                <div className='w-full flex justify-end items-center'>
                    <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => close()}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    )
}