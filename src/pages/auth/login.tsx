import Layout from "@/components/Layout"
import Image from "next/image"
import { useState } from 'react'
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { signIn, SignInResponse } from "next-auth/react"

export default function Login() {

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    const { data: session, status } = useSession()

    async function login() {
        signIn('credentials', { redirect: false, email: email, password: password })
            .then((response: SignInResponse | undefined) => {
                if (response) {
                    response.error ?
                        console.error("RESPONSE ERROR", response.error)
                        : router.push({ pathname: `/profiles/${session?.user.id}` })
                } else console.error('NO RESPONSE FROM SERVER')
            })
            .catch(e => console.error(e))
    }

    return (
        <Layout>
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
                        <span className="label-text">Email?</span>
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
                        <span className="label-text">Password?</span>
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
                    className="btn btn-lg sm:btn-wide mt-10"
                >
                    Login
                </button>
            </div>
        </Layout>
    )
}
