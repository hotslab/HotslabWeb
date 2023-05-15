import Layout from "@/components/Layout"
import UserProfile from '@/components/UserProfile/UserProfile'
import { useRouter } from 'next/router'
import { Country, ProfileExtended, Role, SkillExtended } from "@prisma/client"
import { useSession } from "next-auth/react"

type Props = { profile: ProfileExtended, skills: SkillExtended[], countries: Country[], roles: Role[] }

export default function Profile({ profile, skills, countries, roles }: Props) {
    const router = useRouter()
    const { data: session, status } = useSession()

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
                    <UserProfile profile={profile} skills={skills} countries={countries} roles={roles} />
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    let profile: ProfileExtended | null = null
    let skills: SkillExtended[] | [] = []
    let countries: Country[] | [] = []
    let roles: Role[] | [] = []

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
    await fetch(`http://localhost:3000/api/country`, {
        method: "GET",
        headers: { "content-type": "application/json" },
    }).then(async response => countries = (await response.json()).data)
        .catch(error => console.error(error))
    await fetch(`http://localhost:3000/api/role`, {
        method: "GET",
        headers: { "content-type": "application/json" },
    }).then(async response => roles = (await response.json()).data)
        .catch(error => console.error(error))
    return { props: { profile, skills, countries, roles } }
}