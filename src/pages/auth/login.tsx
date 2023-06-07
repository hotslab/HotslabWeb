import Layout from "@/components/Layout"
import Image from "next/image"
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import { useSession, signIn, SignInResponse, getSession } from "next-auth/react"
import { Session } from "next-auth"
import eventBus from "@/lib/eventBus"
import hotslabImage from "../../../public/assets/hotslab.svg"
import Head from "next/head"

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPasssword] = useState("")
    const { data: session, status } = useSession()

    async function login() {
        eventBus.dispatch("openLoadingPage", true)
        signIn('credentials', { redirect: false, email: email, password: password })
            .then(async (response: SignInResponse | undefined) => {
                if (response) {
                    const session: Session | null = await getSession()
                    response.error
                        ? eventBus.dispatch("openErrorModal", response.error)
                        : await router.push(`/profiles/${session?.user.profileId}`)
                } else eventBus.dispatch("openErrorModal", 'No Response From Server')
                eventBus.dispatch("openLoadingPage", false)
            })
    }
    useEffect(() => {
        if (status === "authenticated" && session) router.push(`/profiles/${session.user.profileId}`)
    }, [status, router, session])

    if (status !== "authenticated") return (
        <Layout>
            <Head>
                <title>Login</title>
                <meta property='og:title' content="Login" />
                <meta name="description" property='og:description' content="Hotslab login page" />
                <meta name="author" content="Joseph Nyahuye" />
                <meta name="keywords" content="login,logout,signin,signout,authentication,authorize,verify,email,password,username" />
            </Head>
            <div className="min-h-screen bg-white flex flex-col items-center justify-start sm:justify-center px-4 lg:px-12">
                <div className="mt-10 mb-5 sm:mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div
                        title="Hotslab Logo"
                        style={{
                            backgroundImage: `url(${hotslabImage.src})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                        className="mx-auto w-full h-[50px]"
                    >
                    </div>
                    <h2 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-gray-600">Email?</span>
                    </label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        className="input text-white input-bordered w-full max-w-xs"
                        value={email}
                        onKeyDown={e => e.key === 'Enter' ? login() : null}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-gray-600">Password?</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        className="input text-white input-bordered w-full max-w-xs"
                        value={password}
                        onKeyDown={e => e.key === 'Enter' ? login() : null}
                        onChange={e => setPasssword(e.target.value)}
                    />
                </div>
                <button
                    onClick={() => login()}
                    className="w-full max-w-xs btn btn-md btn-success mt-5 text-white"
                >
                    Login
                </button>
            </div>
        </Layout>
    )
}
