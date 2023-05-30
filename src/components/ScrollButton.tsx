import { useEffect } from "react"
import { MdPlayArrow } from "react-icons/md"

export default function ScrollButton() {

    function scrollToTop() {
        const targetElement = document.getElementById("hotslab-navbar")
        targetElement?.scrollIntoView({ behavior: "smooth" })
    }
    function setShowTopBtn(showBtn: boolean) {
        const scrollToTop = document.getElementById("hotslab-scroll-to-top")
        if (scrollToTop) scrollToTop.style.display = showBtn ? "flex" : "none"
    }

    useEffect(() => {
        const targetElement: HTMLElement | null = document.getElementById("hotslab-content")
        targetElement?.addEventListener("scroll", () => setShowTopBtn(targetElement.scrollTop > 400))
        return () => targetElement?.removeEventListener('scroll', () => setShowTopBtn(false))
    }, [])

    return (
        <div
            title="Scroll to top of page"
            onClick={() => scrollToTop()}
            id="hotslab-scroll-to-top"
            style={{ display: "none" }}
            className="fixed bottom-[5px] right-[5px] sm:right-[20px] h-[40px] w-[40px] bg-base-100 hover:bg-error rounded-full flex justify-between items-center cursor-pointer"
        >
            <MdPlayArrow className="-rotate-90 text-white text-xl w-full" />
        </div>

    )
}