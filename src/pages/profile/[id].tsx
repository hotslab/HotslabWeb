import Layout from "@/components/Layout"
import UserProfile from '@/components/UserProfile'
import { Profile } from "../../../types"
import { useRouter } from 'next/router'

type Props = { profile: any }

export default function Profile({ profile }: Props) {
    const router = useRouter()
    console.log('profile', profile)
    const dataString: string | null = typeof router.query.data == 'string' ? router.query.data : null
    // const profile: Profile = dataString ? JSON.parse(decodeURIComponent(dataString)) : null
    return (
        <Layout>
            <div className="bg-white px-8">
                <div className="container min-h-screen mx-auto px-4 pt-10">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">Profile</h2>
                    {profile ? <UserProfile profile={profile} /> : <div>No data</div>}
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