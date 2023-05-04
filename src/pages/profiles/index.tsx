import Router from "next/router";
import Layout from "@/components/Layout"
import { ProfileExtended } from "@prisma/client"
import { useSession } from "next-auth/react"
import Image from 'next/image'

type Props = { profiles: ProfileExtended[] }

export default function Profiles({ profiles }: Props) {
    const { status } = useSession()

    return (
        <Layout>
            <div className="bg-white px-8">
                <div className="container min-h-screen mx-auto px-4 pt-10">
                    <div className="py-5 flex justify-between items-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                            {profiles.length > 1 ? 'Profiles' : 'Profile'}
                        </h2>
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                            {profiles.length}
                        </h2>
                    </div>
                    {profiles.length > 0 ?
                        <ul role="list" className="divide-y divide-gray-100">
                            {profiles.map((profile: ProfileExtended) => (
                                <li key={profile.id}
                                    className="flex justify-between gap-x-6 py-5 cursor-pointer"
                                    onClick={() => Router.push({ pathname: `/profiles/${profile.userId}` })}
                                >
                                    <div className="flex gap-x-4" >
                                        <Image
                                            src={profile.imageUrl || "/assets/icon.png"}
                                            alt="Profile Image"
                                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                            height={150}
                                            width={150}
                                        />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{profile.user.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{profile.user.surname}</p>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            DOB {profile.dob}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        : <div className="flex justify-center items-center mt-20 p-8 font-bold text-2xl">
                            <h2 className="text-primary">No profiles found</h2>
                        </div>
                    }
                </div>
            </div>
        </Layout >
    )
}



export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
    const profiles = (await response.json()).data
    return { props: { profiles } }
}