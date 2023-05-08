import Layout from "@/components/Layout"
import UserProfile from '@/components/UserProfile'
import { useRouter } from 'next/router'
import { ProfileExtended, SkillExtended } from "@prisma/client"
import { useState } from "react"
import { MdDelete, MdEdit } from "react-icons/md"

type Props = { profile: ProfileExtended, skills: SkillExtended[] }

export default function Profile({ profile, skills }: Props) {
    const router = useRouter()
    const [editProfile, setEditProfile] = useState(false)
    console.log('profile', profile, skills)
    const dataString: string | null = typeof router.query.data == 'string' ? router.query.data : null

    function deleteProfile() {
        console.log("delete profile")
    }

    return (
        <Layout>
            <div className="min-h-full bg-white">
                <div className="container mx-auto py-10 px-4">
                    <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                            <span>
                                {
                                    profile.user.name && profile.user.surname
                                        ? `${profile.user.name} ${profile.user.surname}`
                                        : 'Profile'
                                }
                            </span>
                            <div className="flex justify-between items-center gap-5">
                                {
                                    !editProfile &&
                                    <MdDelete
                                        title="Delete"
                                        className=""
                                        onClick={() => deleteProfile()}
                                    />
                                }
                                {
                                    !editProfile &&
                                    <MdEdit
                                        title="Edit"
                                        className=""
                                        onClick={() => setEditProfile(true)}
                                    />
                                }

                                <button
                                    className="btn btn-secondary"
                                    onClick={editProfile ? () => setEditProfile(false) : () => router.push("/profiles")}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        editProfile
                            ? <div className="flex justify-center items-center mt-20 p-8 font-bold text-2xl">
                                <h2 className="text-primary">Edit profile information</h2>
                            </div>
                            : <UserProfile profile={profile} skills={skills} />
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    let profile = null
    let skills: SkillExtended[] = []
    await fetch(`http://localhost:3000/api/profile/${context.query.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    }).then(async response => profile = (await response.json()).data)
        .catch(error => console.error(error))
    await fetch(`http://localhost:3000/api/skill?userId=${context.query.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    }).then(async response => skills = (await response.json()).data)
        .catch(error => console.error(error))
    return { props: { profile, skills } }
}