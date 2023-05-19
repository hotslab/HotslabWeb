import { MdSettings } from "react-icons/md"

export default function Spinner() {
    return (
        <div className="bg-white flex justify-center items-center" >
            <MdSettings className="text-error text-[100px] animate-spin" />
        </div >
    )
}