import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { MdEmail, MdCopyright, MdLocationPin } from "react-icons/md"
import eventBus from "@/lib/eventBus"

export default function Layout() {
    const router = useRouter()
    const { data: session, status } = useSession()

    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <div>
                <span className="footer-title">Contact</span>
                <a
                    className="link link-hover flex justify-between items-center gap-1"
                    href="https://goo.gl/maps/ZSeka1Ktj3FeC24fA?coh=178572&entry=tt"
                    target="blank"
                >
                    <MdLocationPin className="text-error" />
                    <span>Harare, Zimbabwe</span>
                </a>
                <a
                    className="link link-hover flex justify-between items-center gap-1"
                    href="mailto:admin@hotslab.com"
                >
                    <MdEmail className="text-warning" />
                    <span> admin@hotslab.com</span>
                </a>
                <a
                    className="link link-hover flex justify-between items-center gap-1"
                    onClick={() => router.push('/')}
                >
                    <span className="text-success font-bold">&#174;</span>
                    <span> 2016 hotslab.com</span>
                </a>
            </div>
            <div>
                <span className="footer-title">Services</span>
                <a>Software Development</a>
                <a>Mobile Applications</a>
                <a>Graphic Designs</a>
            </div>
            <div>
                <span className="footer-title">Links</span>
                <a className="link link-hover" onClick={() => router.push('/projects')}>Portfolio</a>
                <a className="link link-hover" onClick={() => router.push('/developer')}>Profile</a>
                {
                    status === "authenticated"
                        ? <a className="link link-hover" onClick={() => eventBus.dispatch("logOut")}>Logout</a>
                        : <a className="link link-hover" onClick={() => router.push('/auth/login')}>Login</a>
                }
            </div>
        </footer>
    )
}