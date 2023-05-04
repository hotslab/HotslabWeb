import Layout from "@/components/Layout"
import Image from "next/image"
import Router from "next/router"
import { ProjectExtended } from "@prisma/client"

type Props = { projects: ProjectExtended[] }

export default function Projects({ projects }: Props) {

    return (
        <Layout>
            <div className="bg-white px-8">
                <div className="container min-h-screen mx-auto px-4 pt-10">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Projects</h2>
                    <ul role="list" className="divide-y divide-gray-100">
                        {projects.map((project) => (
                            <li key={project.id} className="flex justify-between gap-x-6 py-5">
                                <div className="flex gap-x-4" onClick={() => Router.push(`/projects/${project.id}`)}>
                                    <Image
                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                        src={project.images.url || "/assets/icon.png"}
                                        alt="Project image"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/api/project", {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
    const projects = (await response.json()).data
    return { props: { projects } }
}
