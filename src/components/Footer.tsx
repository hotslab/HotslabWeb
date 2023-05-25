import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { MdEmail, MdLocationPin, MdAccountCircle, MdViewList } from "react-icons/md"
import computerImage from "../../public/assets/computer.svg"
import tabletImage from "../../public/assets/tablet.svg"
import artBoardImage from "../../public/assets/artboard.svg"

export default function Layout() {
    const router = useRouter()
    const { data: session, status } = useSession()

    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <div>
                <span className="footer-title">Services</span>
                <a className="flex justify-start items-center gap-2">
                    <img className="h-[13px]" src={computerImage.src} alt="" />
                    <span>Software Development</span>
                </a>
                <a className="flex justify-start items-center gap-2">
                    <img className="h-[13px]" src={tabletImage.src} alt="" />
                    <span>Mobile Applications</span>
                </a>
                <a className="flex justify-start items-center gap-2">
                    <img className="h-[13px]" src={artBoardImage.src} alt="" />
                    <span>Graphic Designs</span>
                </a>
            </div>
            <div>
                <span className="footer-title">Links</span>
                <a
                    className="flex justify-start items-center gap-2 link link-hover"
                    onClick={() => router.push('/projects')}
                >
                    <span>
                        <MdViewList className="text-white" />
                    </span>
                    <span>Portfolio</span>
                </a>
                <a
                    className="flex justify-start items-center gap-2 link link-hover"
                    onClick={() => router.push('/developer')}
                >
                    <span>
                        <MdAccountCircle className="text-white" />
                    </span>
                    <span>Profile</span>
                </a>
                <a
                    href="http://linkedin.com/in/joseph-nyahuye-4a9b94150" target="_blank"
                    className="hover:underline flex justify-start items-center gap-2"
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="1em" height="1em"
                            stroke="currentColor" fill="currentColor" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                        </svg>
                    </span>
                    <span>LinkedIn</span>
                </a>
            </div>
            <div>
                <span className="footer-title">Contact</span>
                <a
                    className="link link-hover flex justify-between items-center gap-2"
                    href="https://goo.gl/maps/ZSeka1Ktj3FeC24fA?coh=178572&entry=tt"
                    target="blank"
                >
                    <MdLocationPin className="text-white" />
                    <span>Harare, Zimbabwe</span>
                </a>
                <a
                    className="link link-hover flex justify-between items-center gap-2"
                    href="mailto:admin@hotslab.com"
                >
                    <MdEmail className="text-white" />
                    <span> admin@hotslab.com</span>
                </a>
                <a
                    className="link link-hover flex justify-between items-center gap-2"
                    onClick={() => router.push('/')}
                >
                    <span className="text-white font-bold">&#174;</span>
                    <span> 2016 hotslab.com</span>
                </a>
            </div>
        </footer>
    )
}