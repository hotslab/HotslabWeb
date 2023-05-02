import { ReactNode, useState } from "react"
import Footer from "@/components/Footer"
import Router from "next/router";
import { signOut, useSession } from "next-auth/react";

type Props = {
  children: ReactNode
}

export default function Layout(props: Props) {

  const isActive: (pathname: string) => boolean = (pathname) =>
    Router.pathname === pathname;

  const { data: session, status } = useSession();


  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Navbar menu content here */}
        <div className="navbar bg-base-100">
          <div className="flex-none">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-md">HOTSLAB</a>
          </div>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
            </button>
          </div>
        </div>
        {/*! Page content here */}
        <div className="layout w-full">
          {props.children
          }</div>
        {/* Footer content */}
        <Footer />
      </div>
      {/* Sidebar content here */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-52 bg-base-100 text-base-content">
          <li onClick={() => Router.push('/')}><a>Home</a></li>
          <li onClick={() => Router.push('/profile')}><a>Profile</a></li>
          <li onClick={() => Router.push('/project')}><a>Portfolio</a></li>
          <li onClick={() => Router.push('/auth/login')}><a>Login</a></li>
        </ul>
      </div>
    </div>
  )
}