import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { MdEmail, MdLocationPin, MdAccountCircle, MdViewList, MdLogout, MdLogin, MdFacebook } from "react-icons/md"
import computerImage from "../../public/assets/computer.svg"
import tabletImage from "../../public/assets/tablet.svg"
import artBoardImage from "../../public/assets/artboard.svg"
import gitHubImage from "../../public/assets/github.svg"
import gitLabImage from "../../public/assets/gitlab.svg"
import Image from "next/image"
import eventBus from "@/lib/eventBus"
import Script from "next/script"


export default function Layout() {
    const hotslabUrl = "https://hotslab.com"
    const hotslabDescription = "Hotslab provides affordable and quality services in web and mobile app development, custom graphic designs and webmaster services"
    const hotslabHashtags = "Hotslab,SoftwareDeveloper,DevOps,FullStackDeveloper"
    const router = useRouter()
    const { data: session, status } = useSession()

    async function goTo(route: string) {
        if (router.asPath !== route) router.push(route)
    }
    async function logOut() {
        eventBus.dispatch("openLoadingPage", true)
        eventBus.dispatch("logOut")
    }

    return (
        <>
            <Script
                async
                defer
                crossOrigin="anonymous"
                src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v17.0&appId=797267087295416&autoLogAppEvents=1"
                nonce="xsfjbxuI"
            />
            <div id="fb-root"></div>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <div>
                    <span className="footer-title">Services</span>
                    <a className="flex justify-start items-center gap-2">
                        <Image src={computerImage.src} height={13} width={13} alt="Software Development" />
                        <span>Software Development</span>
                    </a>
                    <a className="flex justify-start items-center gap-2">
                        <Image src={tabletImage.src} height={13} width={13} alt="Mobile Applications" />
                        <span>Mobile Applications</span>
                    </a>
                    <a className="flex justify-start items-center gap-2">
                        <Image src={artBoardImage.src} height={13} width={13} alt="Graphic Designs" />
                        <span>Graphic Designs</span>
                    </a>
                </div>
                <div>
                    <span className="footer-title">Site</span>
                    <a
                        className="flex justify-start items-center gap-2 link link-hover"
                        onClick={() => goTo('/projects')}
                    >
                        <span>
                            <MdViewList className="text-white" />
                        </span>
                        <span>Portfolio</span>
                    </a>
                    <a
                        className="flex justify-start items-center gap-2 link link-hover"
                        onClick={() => goTo(status === "authenticated" ? `profiles/${session.user.id}` : '/developer')}
                    >
                        <span>
                            <MdAccountCircle className="text-white" />
                        </span>
                        <span>Profile</span>
                    </a>
                    <a
                        className="flex justify-start items-center gap-2 link link-hover"
                        onClick={() => status === "authenticated" ? logOut() : goTo('/auth/login')}
                    >
                        <span>
                            {
                                status === "authenticated"
                                    ? <MdLogout className="text-white" />
                                    : <MdLogin className="text-white" />
                            }
                        </span>
                        <span>{status === "authenticated" ? "Logout" : "Login"}</span>
                    </a>
                </div>
                <div>
                    <span className="footer-title">Links</span>
                    <a
                        href="https://linkedin.com/in/joseph-nyahuye-4a9b94150" target="_blank"
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
                    <a
                        href="https://github.com/hotslab" target="_blank"
                        className="hover:underline flex justify-start items-center gap-2"
                    >
                        <Image src={gitHubImage.src} height={13} width={13} alt="Gitlab Link" />
                        <span>Github</span>
                    </a>
                    <a
                        href="https://gitlab.com/Hotslab" target="_blank"
                        className="hover:underline flex justify-start items-center gap-2"
                    >
                        <Image src={gitLabImage.src} height={13} width={13} alt="Gitlab Link" />
                        <span>Gitlab</span>
                    </a>
                </div>
                <div>
                    <span className="footer-title">Contact</span>
                    <a
                        className="link link-hover flex justify-between items-center gap-2"
                        href="mailto:admin@hotslab.com"
                    >
                        <MdEmail className="text-white" />
                        <span> admin@hotslab.com</span>
                    </a>
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
                        onClick={() => goTo('/')}
                    >
                        <span className="text-white font-bold">&#174;</span>
                        <span> 2016 hotslab.com</span>
                    </a>
                </div>
            </footer>
            <div className="bg-base-200 w-full px-10 pb-8 flex flex-row md:flex-col  justify-start md:justify-center items-center gap-3">
                <p className="text-[18px] text-gray-500 font-bold">SHARE</p>
                <div className="w-full flex justify-start md:justify-center items-center gap-5">
                    <a
                        className="text-white"
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${hotslabUrl}&src=sdkpreparse`}
                    >
                        <MdFacebook className="text-[24px]" />
                    </a>
                    <a
                        className="text-white"
                        target="_blank"
                        href={`http://www.linkedin.com/shareArticle?mini=true&url=${hotslabUrl}&title=Hotslab%20Website&summary=${hotslabDescription}&source=hotslab.com`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-white" width="24" height="24" stroke="currentColor" fill="currentColor" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                        </svg>
                    </a>
                    <a
                        className="text-white"
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?url=${hotslabUrl}&text=${hotslabDescription}&hashtags=${hotslabHashtags}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="currentColor" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    )
}