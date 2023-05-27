import Layout from "@/components/Layout"
import UserProfile from '@/components/UserProfile/UserProfile'
import { useRouter } from 'next/router'
import { ProfileExtended } from "@prisma/client"
import { useSession } from "next-auth/react"
import { ComponentWithAuth } from "../../../types/authenticated"
import Head from "next/head"
import { useEffect, useState } from "react"
import eventBus from "@/lib/eventBus"
import NotFound from "@/components/NotFound"

const Profile: ComponentWithAuth = () => {
    const [profile, setProfile] = useState<ProfileExtended | null>(null)
    const router = useRouter()
    const { data: session, status } = useSession()

    useEffect(() => {
        eventBus.dispatch("openLoadingPage", true)
        if (router.isReady)
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/profile/${router.query.id}`, {
                method: "GET",
            }).then(async response => {
                if (response.ok) setProfile((await response.json()).data)
                else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
        return () => {
            eventBus.dispatch("openLoadingPage", false)
        }
    }, [router.isReady])

    return (
        <Layout>
            {
                profile !== null ?
                    <>
                        <Head>
                            <title>
                                {profile && profile.user && profile.user.name && profile.user.surname
                                    ? `${profile.user.name} ${profile.user.surname}`
                                    : 'Profile'}
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
                                                    : 'Profile'
                                            }
                                        </span>
                                        {
                                            status === "authenticated"
                                            && session && session.user
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

Profile.auth = true

export default Profile