import { ReactNode, useState } from "react"
import Footer from "@/components/Footer"
import Router from "next/router"
import { signOut, useSession } from "next-auth/react"
import { MdMenu, MdAccountCircle } from "react-icons/md"
import { useRouter } from "next/router"
import Image from "next/image"

type Props = {
  children: ReactNode
}

export default function Layout(props: Props) {

  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const isActive: (pathname: string) => boolean = (pathname) =>
    Router.pathname === pathname;

  const { data: session, status } = useSession()

  async function goTo(route: string) {
    setShowMenu(false)
    if (route == 'profile')
      router.push({ pathname: `/profiles/${session?.user.id}` })
  }
  async function logOut() {
    setShowMenu(false)
    await signOut({ redirect: false })
    router.push({ pathname: "/" })
  }
  function getFormattedName(): string {
    if (session && session.user) {
      // const name = `${session.user.name} ${session.user.surname}`
      const name = 'Joseph Nyahuye'
      return name.length > 15 ?
        `${name.substring(0, 14)}...` : name
    }
    return 'Profile'
  }
  function getDisplayImage(url: string | null | undefined): string | null {
    return url ? `'http://localhost:3000/${url}'` : null
  }

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Navbar menu content here */}
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
              {/* <MdMenu className="text-2xl" /> */}
              <Image
                src="/assets/hotslab.svg"
                alt="Hotslab Logo"
                height={25}
                width={25}
              />
            </label>
          </div>
          <div className="flex-1 mx-0">
            <a
              className="btn btn-ghost normal-case px-1 flex justify-between item-center gap-1"
              onClick={() => router.push({ pathname: '/' })}
            >
              <span className="font-bold text-[15px] sm:text-[25px]">HOTSLAB</span>
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
                        backgroundImage: `url(${getDisplayImage(session.user.image)}`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                      }}
                      className="w-[30px] h-[30px] p-0 rounded-full"
                    >
                    </div>
                    : <MdAccountCircle className="text-2xl" />
                }
              </button>
            }
            {
              showMenu &&
              <div className="absolute top-9 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                <ul className="menu bg-base-100 w-56">
                  {
                    status === "authenticated" &&
                    <li onClick={() => goTo('profile')}>
                      <a className="text-ellipsis overflow-hidden ...">
                        <span title={session.user ? `${session.user.name} ${session.user.surname}` : ''}>
                          {getFormattedName()}
                        </span>
                      </a>
                    </li>
                  }
                  <li onClick={() => logOut()}><a>Log Out</a></li>
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
          <li onClick={() => Router.push('/')}><a>Home</a></li>
          <li onClick={() => Router.push('/projects')}><a>Portfolio</a></li>
          {
            status === "authenticated" &&
            <li onClick={() => Router.push('/profiles')}><a>Profiles</a></li>
          }
          {
            status === "authenticated" &&
            <li onClick={() => Router.push('/roles')}><a>Roles</a></li>
          }
          {
            status === "authenticated" &&
            <li onClick={() => Router.push('/tags')}><a>Tags</a></li>
          }
          {
            status === "authenticated" &&
            <li onClick={() => Router.push('/skills')}><a>Skills</a></li>
          }
          {
            status != "authenticated" &&
            <li onClick={() => Router.push('/auth/login')}><a>Login</a></li>
          }
        </ul>
      </div>
    </div>
  )
}