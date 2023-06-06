import { useEffect, useState } from "react"
import { ProjectExtended, ProjectImage, Tag } from "@prisma/client"
import { useRouter } from "next/router"
import { MdImage } from "react-icons/md"
import Layout from "@/components/Layout"
import Head from "next/head"
import eventBus from "@/lib/eventBus"


export default function Projects() {
    const [projects, setProjects] = useState<ProjectExtended[]>([])
    const [tags, setTags] = useState<Tag[]>([])

    const router = useRouter()

    async function getTags() {
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tag`, {
            method: "GET",
        }).then(async response => {
            if (response.ok) setTags((await response.json()).data)
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
        })
    }
    async function getProjects(tag: string) {
        const selectedTags = tag === 'all'
            ? tags.reduce((prev: string, curr: Tag, index: number, array: Tag[]) =>
                prev += `${curr.name}${array.length - 1 > index ? ',' : ''}`, "")
            : tag
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project?tags=${selectedTags}`, {
            method: "GET",
        }).then(async response => {
            if (response.ok) setProjects((await response.json()).data)
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }

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

    useEffect(() => {
        if (router.isReady) {
            getTags()
            getProjects("all")
        }
    }, [router.isReady]) // eslint-disable-line

    return (
        <Layout>
            <Head>
                <title>Portfolio</title>
            </Head>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto py-10 px-4 text-white">
                    <div className="bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-4">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                            <div className="flex justify-between items-center flex-wrap gap-5 flex-wrap">
                                <span>Portfolio</span>
                                <select
                                    className="select select-bordered text-white"
                                    onChange={e => getProjects(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    {tags.map(
                                        (tag: Tag, index: number, array: Tag[]) => (
                                            <option key={index} value={tag.name}>
                                                {tag.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
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