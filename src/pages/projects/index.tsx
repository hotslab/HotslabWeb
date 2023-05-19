import Layout from "@/components/Layout"
import Router from "next/router"
import { MdImage } from "react-icons/md"
import { ProjectExtended, ProjectImage } from "@prisma/client"
import Head from "next/head"

type Props = { projects: ProjectExtended[] }

export default function Projects({ projects }: Props) {

    function getFirstImage(images: ProjectImage[] | undefined) {
        if (images && images.length > 0) {
            return <div
                style={{
                    backgroundImage: `url('${process.env.NEXT_PUBLIC_HOST}/${images[0].url}')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                }}
                className="w-full h-[300px] p-0"
            />
        } else return <MdImage className="text-success text-[300px] w-[100%] h-[300px]" />
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
                    <div className="flex justify-center items-center flex-wrap gap-2">
                        {projects.map((project: ProjectExtended) => (
                            <div
                                key={project.id}
                                className="bg-base-100 w-[300px] h-[300px] shadow-xl mb-10 mx-5 sm:mx-auto flex flex-col justify-center items-center"
                            >
                                {getFirstImage(project.images)}
                                <div className="w-full h-full p-6 flex flex-col justify-between items-start gap-5">
                                    <p className="font-bold text-md sm:text-xl">{project.projectName}</p>
                                    <div className="card-actions justify-end w-full">
                                        <button
                                            className="btn btn-success text-white"
                                            onClick={() => Router.push(`/projects/${project.id}`)}
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project?tags=portfolio,design`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    })
    const projects = (await response.json()).data
    return { props: { projects } }
}
