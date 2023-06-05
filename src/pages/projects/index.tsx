import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { MdImage } from "react-icons/md"
import { ProjectExtended, ProjectImage } from "@prisma/client"
import Head from "next/head"

type Props = { projects: ProjectExtended[] }

export default function Projects({ projects }: Props) {
    const router = useRouter()

    function getFirstImage(images: ProjectImage[] | undefined) {
        if (images && images.length > 0) {
            return <div
                style={{
                    backgroundImage: `url('${process.env.NEXT_PUBLIC_IMAGE_HOST}/${images[0].url}')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}
                className="w-full h-[300px] scale-110 p-0 transition ease-in-out delay-10 hover:scale-150"
            >
                <div className="w-full h-[300px] bg-[linear-gradient(to_top,black_10%,_transparent_90%)] hover:bg-none" />
            </div>
        } else return <MdImage className="text-success text-[100px] w-[100%] p-0 transition ease-in-out delay-150 scale-110 hover:scale-150" />
    }

    return (
        <Layout>
            <Head>
                <title>Portfolio</title>
            </Head>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto py-10 px-4 text-white">
                    <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                            <span>Portfolio</span>
                            <span>{projects.length}</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-wrap gap-4">
                        {projects.map((project: ProjectExtended) => (
                            <div
                                key={project.id}
                                className="bg-base-100 w-[300px] h-[300px] shadow-xl mb-10 mx-5 sm:mx-0 flex flex-col justify-center items-center"
                            >
                                <div className="w-full h-[300px] overflow-hidden flex justify-center items-center">
                                    {getFirstImage(project.images)}
                                </div>
                                <div className="h-[60%] sm:h-[45%] w-full px-6 py-4 flex flex-col justify-between items-start gap-5">
                                    <p className="font-bold text-sm sm:text-md">{project.projectName}</p>
                                    <div className="card-actions justify-end w-full">
                                        <button
                                            className="btn btn-success btn-sm text-white"
                                            onClick={() => router.push(`/projects/${project.id}`)}
                                        >
                                            open
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    let projects: ProjectExtended[] | [] = []
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project?tags=portfolio,design`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    }).then(async response => {
        if (response.ok) {
            projects = (await response.json()).data
        } else console.log((await response.json()).data)
    })
    return { props: { projects } }
}
