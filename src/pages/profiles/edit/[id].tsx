import { useEffect, useState } from "react"
import Layout from "@/components/Layout"
import { useRouter } from 'next/router'
import { Country, ProfileExtended, SkillExtended } from "@prisma/client"
import { MdDelete, MdEditSquare } from "react-icons/md"

export default function ProfileEdit() {
    const [profile, setProfile] = useState<ProfileExtended | null>(null)
    const [skills, setSkills] = useState<SkillExtended | []>([])
    const [countries, setCountries] = useState<Country | []>([])
    const router = useRouter()
    useEffect(() => {
        await fetch(`http://localhost:3000/api/profile/${context.query.id}`, {
            method: "GET",
            headers: { "content-type": "application/json", },
        }).then(async response => setProfile((await response.json()).data))
            .catch(error => console.error(error))
        await fetch(`http://localhost:3000/api/skill?userId=${context.query.id}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        }).then(async response => setSkills((await response.json()).data))
            .catch(error => console.error(error))
        await fetch(`http://localhost:3000/api/contry`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        }).then(async response => setCountries((await response.json()).data))
            .catch(error => console.error(error))
    }, [profile, skills])

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
                                    profile && profile.user.name && profile.user.surname
                                        ? `${profile.user.name} ${profile.user.surname}`
                                        : 'Profile'
                                }
                            </span>
                            <div className="flex justify-between items-center gap-5">

                                <MdDelete
                                    title="Delete"
                                    className=""
                                    onClick={() => deleteProfile()}
                                />
                                <button
                                    className="btn btn-error text-white"
                                    onClick={() => router.push("/profiles")}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <UserProfile profile={profile} skills={skills} />
                </div>
            </div>
        </Layout
)
}