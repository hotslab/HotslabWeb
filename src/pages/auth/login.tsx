import Layout from "@/components/Layout"
import Image from "next/image"
import { useState } from 'react'
import { useRouter } from "next/router"
import { useSession, signIn, SignInResponse, getSession } from "next-auth/react"
import { Session } from "next-auth"
import { MdOutlineCancel } from "react-icons/md"
import eventBus from "@/lib/eventBus"

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState("joseph.nyahuye@gmail.com")
    const [password, setPasssword] = useState("joseph")
    const [errorMessage, setErrorMessage] = useState("")
    const { data: session, status } = useSession()

    async function login() {
        eventBus.dispatch("openLoadingPage", true)
        signIn('credentials', { redirect: false, email: email, password: password })
            .then(async (response: SignInResponse | undefined) => {
                if (response) {
                    const session: Session | null = await getSession()
                    response.error
                        ? eventBus.dispatch("openErrorModal", response.error)
                        : await router.push({ pathname: `/profiles/${session?.user.id}` })
                } else setErrorMessage('No Response From Server')
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    return (
        <Layout>
            {errorMessage &&
                <div className="alert alert-error shadow-lg">
                    <div className="w-full flex items-center justify-between font-bold">
                        <span>{errorMessage}</span>
                        <MdOutlineCancel
                            onClick={() => setErrorMessage("")}
                            className="text-2xl cursor-pointer"
                        />
                    </div>
                </div>
            }
            <div className="bg-white flex min-h-screen flex flex-col items-center justify-center px-4 lg:px-12">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src="/assets/hotslab.svg"
                        alt="Your Company"
                        width={100}
                        height={100}
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-gray-400 font-bold">Email?</span>
                    </label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        className="input input-bordered w-full max-w-xs"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-gray-400 font-bold">Password?</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        className="input input-bordered w-full max-w-xs"
                        value={password}
                        onChange={e => setPasssword(e.target.value)}
                    />
                </div>
                {/* onClick={() => login()} */}
                <button
                    onClick={() => login()}
                    className="btn btn-lg sm:btn-wide mt-10 text-white"
                >
                    Login
                </button>
            </div>
        </Layout>
    )
}
