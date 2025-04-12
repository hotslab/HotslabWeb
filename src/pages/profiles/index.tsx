import { useRouter } from "next/router";
import Layout from "@/components/Layout"
import { ProfileExtended } from "@prisma/client"
import Head from "next/head"
import { MdAccountCircle } from "react-icons/md"
import { ComponentWithAuth } from "../../../types/authenticated"

type Props = { profiles: ProfileExtended[] }

const Profiles: ComponentWithAuth<Props> = ({ profiles }: Props) => {
    const router = useRouter()

    function getShortText(unformattedText: string): string {
        return unformattedText.length > 50 ? `${unformattedText.substring(0, 50)}...` : unformattedText
    }
    function getDisplayImage(url: string | null): string | null {
        return url ? `'${process.env.NEXT_PUBLIC_IMAGE_HOST}/${url}'` : null
    }

    return (
        <Layout>
            <Head>
                <title>Profiles</title>
                <meta property='og:title' content="Profiles" />
                <meta name="description" property='og:description' content="List of Hotslab's developers and users" />
                <meta name="author" content="Joseph Nyahuye" />
                <meta name="keywords" content={`user,developer,software programmer,full stack developer,web developer`} />
            </Head>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto py-10 px-4">
                    <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>Profiles</span>
                            <span>{profiles.length}</span>
                        </div>
                    </div>
                    {profiles.length > 0 ?
                        <div className="flex justify-center items-center flex-wrap gap-4">
                            {profiles.map((profile: ProfileExtended) => (
                                <div key={profile.id}
                                    className="bg-base-100 shadow-xl flex flex-col justify-center items-center h-[300px] w-[300px] pt-5"
                                >
                                    {
                                        profile.imageUrl
                                            ?
                                            <div
                                                title={`${profile.user.name} ${profile.user.surname}`}
                                                style={{
                                                    backgroundImage: `url(${getDisplayImage(profile.imageUrl)})`,
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center"
                                                }}
                                                className="w-[120px] h-[120px] p-0 rounded-full"
                                            >
                                            </div>
                                            : <MdAccountCircle className="text-[120px] text-success" />
                                    }
                                    <div className="h-[60%] sm:h-[45%] w-full p-6 flex flex-col justify-between items-start gap-5">
                                        <div className="w-full flex flex-col justify-start items-start flex-wrap gap-3 text-white">
                                            <p title={`${profile.user.name} ${profile.user.surname}`} className="w-full text-md">
                                                {getShortText(`${profile.user.name} ${profile.user.surname}`)}
                                            </p>
                                            <p className="text-xs">{profile.user.role.name}</p>
                                        </div>
                                        <div className="card-actions justify-end w-full">
                                            <button
                                                className="btn btn-success btn-sm text-white"
                                                onClick={() => router.push(`/profiles/${profile.id}`)}
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



export async function getServerSideProps(context: any) {
    let profiles: ProfileExtended[] | [] = []
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/profile`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    }).then(async response => {
        if (response.ok) {
            profiles = (await response.json()).data
        } else console.log((await response.json()).data)
    })
    return { props: { profiles } }
}

Profiles.auth = true

export default Profiles