import Layout from "@/components/Layout"
import UserProfile from '@/components/UserProfile'
import { useRouter } from 'next/router'
import { ProfileExtended } from "@prisma/client"

type Props = { profile: ProfileExtended }

export default function Profile({ profile }: Props) {
    const router = useRouter()
    console.log('profile', profile)
    const dataString: string | null = typeof router.query.data == 'string' ? router.query.data : null
    // const profile: Profile = dataString ? JSON.parse(decodeURIComponent(dataString)) : null
    return (
        <Layout>
            <div className="bg-white px-8">
                <div className="container min-h-screen mx-auto px-4 pt-10">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Profile</h2>
                        <button
                            className="btn btn-active btn-secondary"
                            onClick={() => router.push("/profiles")}
                        >Back</button>
                    </div>
                    {
                        profile ?
                            <UserProfile profile={profile} />
                            : <div className="flex justify-center items-center mt-20 p-8 font-bold text-2xl">
                                <h2 className="text-primary">No profile information found</h2>
                            </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    let profile = null
    const response = await fetch(`http://localhost:3000/api/profile/${context.query.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    }).then(async response => profile = (await response.json()).data)
        .catch(error => console.error(error))
    return { props: { profile } }
}