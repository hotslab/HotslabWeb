import { MdPlayArrow } from "react-icons/md"
import Link from "next/link"

export default function ScrollButton() {

    function scrollToTop() {
        if (typeof window !== "undefined") {
            const targetElement = document.getElementById("hotslab-navbar")
            targetElement?.scrollIntoView({ behavior: "smooth" })
        }
    }
    return (
        <div
            title="Scroll to top of page"
            onClick={() => scrollToTop()}
            className="fixed bottom-[5px] right-[5px] h-[40px] w-[40px] bg-base-100 hover:bg-error rounded-full flex justify-between items-center cursor-pointer"
        >
            <MdPlayArrow className="-rotate-90 text-white text-xl w-full" />
        </div>

    )
}