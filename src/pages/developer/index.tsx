import Layout from "@/components/Layout"
import { useRouter } from 'next/router'
import { ProfileExtended } from "@prisma/client"
import { useSession } from "next-auth/react"
import Head from "next/head"
import dynamic from 'next/dynamic'
import Spinner from "@/components/Spinner"
import NotFound from "@/components/NotFound"

const UserProfile = dynamic(() => import("@/components/UserProfile/UserProfile"), { loading: () => <Spinner /> })

type Props = { profile: ProfileExtended }

export default function Profile({ profile }: Props) {
    const router = useRouter()
    const { data: session, status } = useSession()

    return (
        <Layout>
            {
                profile !== null ?
                    <>
                        <Head>
                            <title>
                                {profile.user.name && profile.user.surname
                                    ? `${profile.user.name} ${profile.user.surname}`
                                    : 'Developer'}
                            </title>
                        </Head>
                        <div className="min-h-screen bg-white">
                            <div className="container mx-auto py-10 px-4">
                                <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                                    <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                                        <span>
                                            {
                                                profile.user.name && profile.user.surname
                                                    ? `${profile.user.name} ${profile.user.surname}`
                                                    : 'Developer'
                                            }
                                        </span>
                                        {
                                            status === "authenticated"
                                            && (session.user.role === "Owner" || session.user.role === "Admin")
                                            &&
                                            <div className="flex justify-between items-center gap-5">
                                                <button
                                                    className="btn btn-error text-white"
                                                    onClick={() => router.push("/profiles")}
                                                >
                                                    Back
                                                </button>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <UserProfile profile={profile} />
                            </div>
                        </div>
                    </>
                    : <NotFound />
            }
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    let profile: ProfileExtended | null = null
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/developer`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    }).then(async response => {
        if (response.ok) {
            profile = (await response.json()).data
        } else console.log((await response.json()).data)
    })
    return { props: { profile } }
}