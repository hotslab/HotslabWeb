import Layout from "@/components/Layout"
import { ProjectExtended, ProjectImage, ProjectSkillExtended, ProjectTagExtended } from "@prisma/client"
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from "react"
import DOMPurify from 'isomorphic-dompurify'
import { MdImage } from "react-icons/md"
import Head from "next/head"

type Props = { project: ProjectExtended }

export default function Project({ project }: Props) {
    const [displayImage, setDisplayImage] = useState<string | null>(null)
    const router = useRouter()

    function setCurrentDisplayImage(url: string | null) {
        const imageUrl = url ? `'${process.env.NEXT_PUBLIC_HOST}/${url}'` : null
        setDisplayImage(imageUrl)
    }
    const setDefaultImage = useCallback(async () => {
        setCurrentDisplayImage(
            project && project.images && project.images.length > 0 ? project.images[0].url : null
        )
    }, [project])

    useEffect(() => { setDefaultImage() }, [setDefaultImage])

    return (
        <Layout>
            <Head>
                <title>{project.projectName}</title>
            </Head>
            <div className="min-h-screen bg-white">
                <div className="container mx-auto py-10 px-4">
                    <div className="text-white bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3" id="image-container">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                            <span>{project.projectName}</span>
                            <button
                                className="btn btn-md btn-error text-white"
                                onClick={() => router.push("/projects")}
                            >
                                Back
                            </button>
                        </div>
                        <div className="text-xs font-bold text-gray-400 flex justify-start items-center flex-wrap gap-1">
                            <span>Tags:</span>
                            {project.tags?.map((tag: ProjectTagExtended, index: number, array: ProjectTagExtended[]) => (
                                <span key={tag.id}>
                                    {tag.tag.name}
                                    {index + 1 < array.length ? "," : ""}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="slideshow mb-10">
                        <div className="carousel w-full">
                            {
                                displayImage !== null
                                    ?
                                    <div
                                        className="carousel-item w-full h-[200px] sm:h-[400px]"
                                        style={{
                                            backgroundImage: `url(${displayImage})`,
                                            backgroundPosition: "center",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                    />
                                    : <MdImage className="text-success text-[200px] sm:text-[400px] w-[100%] h-[200px] sm:h-[400px]" />
                            }
                        </div>
                        <div className="flex justify-center w-full py-2 gap-2">
                            {project.images && project.images?.length > 0 &&
                                project.images?.map((image: ProjectImage, index: number) => (
                                    <a
                                        key={image.id} id={`item${index + 1}`}
                                        href="#image-container"
                                        className="btn btn-xs"
                                        onClick={() => setCurrentDisplayImage(image.url)}
                                    >
                                        {index + 1}
                                    </a>
                                ))}
                        </div>
                    </div>
                    <div
                        className="text-gray-500 mb-10"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
                    />
                    <dl className="mb-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {project.skills && project.skills?.length > 0 &&
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">Skills</dt>
                                <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                                    {project.skills?.map(
                                        (skill: ProjectSkillExtended, index: number, array: ProjectSkillExtended[]) => (
                                            <span key={skill.id}>
                                                {skill.skill.name}
                                                {index + 1 < array.length ? "," : ""}
                                            </span>
                                        ))}
                                </dd>
                            </div>
                        }
                        <div className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Duration</dt>
                            <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-2">
                                <span>From: {project.startDate ? format(new Date(project.startDate), 'yyyy-MM-dd') : '-'}</span>
                                <span>-</span>
                                <span>To: {project.endDate ? format(new Date(project.endDate), 'yyyy-MM-dd') : '-'}</span>
                            </dd>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Completed</dt>
                            <dd className="mt-2 text-sm text-gray-500">
                                {project.isOngoing === true ? 'No' : 'Yes'}
                            </dd>
                        </div>
                        {project.clients && project.clients?.length > 0 &&
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">Client Name</dt>
                                <dd className="mt-2 text-sm text-gray-500">
                                    {project.clients[0].client.company}
                                </dd>
                            </div>
                        }
                        {project.experiences && project.experiences?.length > 0 &&
                            <div className="border-t border-gray-200 pt-4">
                                <dt className="font-medium text-gray-900">Created Under</dt>
                                <dd className="mt-2 text-sm text-gray-500">
                                    {project.experiences[0]?.experience.companyName}
                                </dd>
                            </div>
                        }
                    </dl>
                </div>
            </div>
        </Layout >
    )
}


export async function getServerSideProps(context: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/${context.query.id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "cookie": context.req.headers.cookie || ""
        },
    })
    const project = (await response.json()).data
    return { props: { project } }
}