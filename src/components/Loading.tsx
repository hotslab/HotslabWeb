import { MdSettings } from "react-icons/md"
export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex justify-center items-center" >
            <MdSettings className="text-error text-[100px] animate-spin" />
        </div >
    )
}