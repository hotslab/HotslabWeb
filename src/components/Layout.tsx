import { ReactNode, useState } from "react"
import { useSession } from "next-auth/react"
import { MdAccountCircle } from "react-icons/md"
import { useRouter } from "next/router"
import Image from "next/image"
import eventBus from "@/lib/eventBus"
import Head from 'next/head'
import Footer from "@/components/Footer"

type Props = {
  children: ReactNode
}

export default function Layout(props: Props) {

  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const { data: session, status } = useSession()

  async function goTo(route: string) {
    setShowMenu(false)
    if (router.asPath !== route) router.push(route)
  }
  async function logOut() {
    setShowMenu(false)
    eventBus.dispatch("openLoadingPage", true)
    eventBus.dispatch("logOut")
  }
  function getFormattedName(): string {
    if (session && session.user) {
      const name = `${session.user.name} ${session.user.surname}`
      return name.length > 15 ?
        `${name.substring(0, 14)}...` : name
    }
    return 'Profile'
  }
  function getDisplayImage(url: string | null | undefined): string | null {
    return url ? `'${process.env.NEXT_PUBLIC_IMAGE_HOST}/${url}'` : null
  }

  return (
    <>
      <Head>
        <link rel="icon" href="favicon.svg"></link>
      </Head>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div id="hotslab-content" className="drawer-content flex flex-col items-center justify-start">
          {/* Navbar menu content here */}
          <div id="hotslab-navbar" className="navbar bg-base-100">
            <div className="flex-none">
              <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                <Image
                  src="/assets/hotslab.svg"
                  alt="Hotslab Logo"
                  height={25}
                  width={25}
                />
              </label>
            </div>
            <div className="flex-1 ml-[3px] mr-0">
              <a
                className="normal-case px-1 flex justify-between item-center gap-1"
                onClick={() => goTo('/')}
              >
                <span className="font-bold text-white hover:text-gray-300 text-[15px] sm:text-[25px]">HOTSLAB</span>
              </a>
            </div>
            <div className="flex-none relative">
              {
                status === "authenticated" &&
                <button className="btn btn-square btn-ghost" onClick={() => setShowMenu(showMenu ? false : true)}>
                  {
                    session && session.user && session.user.image
                      ? <div
                        title={`${session.user.name} ${session.user.surname}`}
                        style={{
                          backgroundImage: `url(${getDisplayImage(session.user.image)})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center"
                        }}
                        className="w-[30px] h-[30px] p-0 rounded-full"
                      >
                      </div>
                      : <MdAccountCircle className="text-2xl text-white" />
                  }
                </button>
              }
              {
                showMenu &&
                <div className="absolute top-9 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                  <ul className="menu bg-base-100 w-56">
                    {
                      status === "authenticated" &&
                      <li onClick={() => goTo(`/profiles/${session?.user.profileId}`)} className="text-white">
                        <a className="text-ellipsis overflow-hidden ...">
                          <span title={session.user ? `${session.user.name} ${session.user.surname}` : ''}>
                            {getFormattedName()}
                          </span>
                        </a>
                      </li>
                    }
                    <li onClick={() => logOut()} className="text-white"><a>Log Out</a></li>
                  </ul>
                </div>
              }
            </div>
          </div>
          {/*! Page content here */}
          <div className="layout w-full">
            {props.children}
          </div>
          {/* Footer content */}
          <Footer />
        </div>
        {/* Sidebar content here */}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-52 bg-base-100 text-base-content">
            <li onClick={() => goTo('/')}><a>Home</a></li>
            <li onClick={() => goTo('/projects')}><a>Portfolio</a></li>
            {
              status === "authenticated" &&
              <li onClick={() => goTo('/profiles')}><a>Profiles</a></li>
            }
            {
              status === "authenticated" &&
              <li onClick={() => goTo('/roles')}><a>Roles</a></li>
            }
            {
              status === "authenticated" &&
              <li onClick={() => goTo('/tags')}><a>Tags</a></li>
            }
            {
              status === "authenticated" &&
              <li onClick={() => goTo('/skills')}><a>Skills</a></li>
            }
            {
              status !== "authenticated" &&
              <li onClick={() => goTo('/developer')}><a>Profile</a></li>
            }
            {
              status !== "authenticated" &&
              <li onClick={() => goTo('/auth/login')}><a>Login</a></li>
            }
          </ul>
        </div>
      </div>
    </>
  )
}