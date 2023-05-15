import { useRouter } from "next/router";
import Layout from "@/components/Layout"
import { ProfileExtended } from "@prisma/client"
import { useSession } from "next-auth/react"
import Image from 'next/image'
import { MdAccountCircle } from "react-icons/md"

type Props = { profiles: ProfileExtended[] }

export default function Profiles({ profiles }: Props) {
    const { status } = useSession()
    const router = useRouter()

    function getDisplayImage(url: string | null): string | null {
        return url ? `'http://localhost:3000/${url}'` : null
    }

    return (
        <Layout>
            <div className="min-h-full bg-white">
                <div className="container mx-auto py-10 px-4">
                    <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                            <span>Profiles</span>
                            <span>{profiles.length}</span>
                        </div>
                    </div>
                    {profiles.length > 0 ?
                        <div className="flex justify-between items-center flex-wrap gap-3">
                            {profiles.map((profile: ProfileExtended) => (
                                <div key={profile.id}
                                    className="bg-base-100 shadow-xl flex flex-col justify-center items-center h-[300px] w-[300px]"
                                >
                                    <div className="w-full pt-6 flex justify-center items-center">
                                        {
                                            profile.imageUrl
                                                ?
                                                <div
                                                    title={`${profile.user.name} ${profile.user.surname}`}
                                                    style={{
                                                        backgroundImage: `url(${getDisplayImage(profile.imageUrl)}`,
                                                        backgroundSize: "contain",
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundPosition: "center"
                                                    }}
                                                    className="w-[100px] h-[100px] p-0 rounded-full"
                                                >
                                                </div>
                                                : <MdAccountCircle className="text-[100px]" />
                                        }
                                    </div>
                                    <div className="w-full h-full p-6 flex flex-col justify-between items-start gap-5">
                                        <div className="w-full flex flex-col justify-between items-start flex-wrap gap-3">
                                            <p className="card-title text-md sm:text-lg">{profile.user.name} {profile.user.surname}</p>
                                            <p className="card-title text-xs sm:text-sm">{profile.user.role.name}</p>
                                        </div>
                                        <div className="card-actions justify-end w-full">
                                            <button
                                                className="btn btn-md btn-success text-white"
                                                onClick={() => router.push({ pathname: `/profiles/${profile.userId}` })}
                                            >
                                                open
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : <div className="flex justify-center items-center my-20 p-8 font-bold text-2xl">
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