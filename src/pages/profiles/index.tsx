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

    function getProfileImage(image: string | null) {
        return image ? `http://localhost:3000${image}` : ""
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
                        <div className="">
                            {profiles.map((profile: ProfileExtended) => (
                                <div key={profile.id}
                                    className="bg-base-100 shadow-xl mb-10 mx-5 sm:mx-auto flex flex-col sm:flex-row justify-center items-center"
                                >
                                    <div className="w-full h-1/3 sm:h-full sm:w-1/5 p-6 flex justify-center items-center">
                                        {
                                            profile.imageUrl
                                                ? <Image
                                                    src={profile.imageUrl}
                                                    alt={`${profile.user.name} ${profile.user.surname}`}
                                                    width={100}
                                                    height={100}
                                                    className="mask mask-circle"
                                                />
                                                : <MdAccountCircle className="text-[100px]" />
                                        }
                                    </div>
                                    <div className="w-full h-2/3 sm:h-full sm:w-4/5 h-full sm:h-[200px] p-6 flex flex-col justify-between items-start gap-5">
                                        <div className="w-full flex justify-between items-center flex-wrap gap-3">
                                            <h6 className="card-title text-md">{profile.user.name} {profile.user.surname}</h6>
                                            <p className="card-title text-sm">{profile.user.role.name}</p>
                                        </div>
                                        <div className="card-actions justify-end w-full">
                                            <button
                                                className="btn btn-primary"
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