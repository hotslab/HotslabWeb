import Layout from "@/components/Layout"
import { ProjectExtended, ProjectImage, ProjectSkillExtended, ProjectTagExtended } from "@prisma/client"
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import DOMPurify from 'isomorphic-dompurify'
import { MdCancel, MdImage } from "react-icons/md"
import Head from "next/head"
import eventBus from "@/lib/eventBus"
import dynamic from 'next/dynamic'
import Spinner from "@/components/Spinner"

const Skeleton = dynamic(() => import("@/components/Skeleton"), { loading: () => <Spinner /> })
const Modal = dynamic(() => import("@/components/Modal"), { loading: () => <Spinner /> })
const Image = dynamic(() => import("next/image"), { loading: () => <Spinner /> })

export default function Project() {
    const [displayImage, setDisplayImage] = useState<string | null>(null)
    const [displayImageCaption, setDisplayImageCaption] = useState<string>('')
    const [showSlideShow, setShowSlideshow] = useState<boolean>(false)
    const [project, setProject] = useState<ProjectExtended | null>(null)
    const router = useRouter()

    function setCurrentDisplayImage(url: string | null, caption: string = '', scroll: boolean = false) {
        const imageUrl = url ? `${process.env.NEXT_PUBLIC_IMAGE_HOST}/${url}` : null
        setDisplayImage(imageUrl)
        setDisplayImageCaption(caption)
        if (scroll && typeof window !== "undefined") {
            const targetElement = document.getElementById("image-container")
            targetElement?.scrollIntoView({ behavior: "smooth" })
        }
    }
    useEffect(() => {
        eventBus.dispatch("openLoadingPage", true)
        if (router.isReady && typeof window !== "undefined")
            fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/${router.query.id}`, { method: "GET", })
                .then(async response => {
                    if (response.ok) {
                        const projectData = (await response.json()).data
                        setProject(projectData)
                        const firstImage: ProjectImage | null = projectData && Array.isArray(projectData.images) && projectData.images.length > 0 ? projectData.images[0] : null
                        setCurrentDisplayImage(
                            firstImage?.url || null,
                            firstImage?.caption || ''
                        )
                    } else eventBus.dispatch("openErrorModal", (await response.json()).data)
                    eventBus.dispatch("openLoadingPage", false)
                })
        return () => {
            eventBus.dispatch("openLoadingPage", false)
        }
    }, [router.isReady, router.query.id])

    return (
        <Layout>
            <Head>
                <title>{project ? project.projectName : 'Project'}</title>
                <meta property='og:title' content={project ? project.projectName : 'Project'} />
                <meta name="description" property='og:description' content={DOMPurify.sanitize(project ? project.description : 'Hotslab software project.')} />
                <meta name="author" content="Joseph Nyahuye" />
                <meta
                    name="keywords"
                    content={project && Array.isArray(project.skills) && project.skills.length > 0
                        ? project.skills.reduce(
                            (prev: string, curr: ProjectSkillExtended, index: number, array: ProjectSkillExtended[]) =>
                                prev += `${curr.skill.name}${index + 1 < array.length ? "," : ""}`, "")
                        : ""
                    }
                />
            </Head>
            {
                project !== null ?
                    <div className="min-h-screen bg-white">
                        <div className="container mx-auto py-10 px-4">
                            <div className="text-white bg-base-100 mb-10 px-[1.5rem] py-[1rem] flex flex-col gap-3" id="image-container">
                                <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
                                    <span>{project.projectName}</span>
                                    <button
                                        className="btn btn-sm btn-error text-white"
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
                                                title="Click to view full image"
                                                onClick={() => setShowSlideshow(true)}
                                                className="cursor-pointer carousel-item w-full h-[200px] sm:h-[500px] flex items-end"
                                                style={{
                                                    backgroundImage: `url('${displayImage}')`,
                                                    backgroundPosition: "top",
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat"
                                                }}
                                            >
                                                <div className="w-full h-[30%] bg-[linear-gradient(to_top,black_5%,_transparent_95%)]" />
                                            </div>
                                            : <MdImage className="text-success text-[200px] sm:text-[400px] w-[100%] h-[200px] sm:h-[400px]" />
                                    }
                                </div>
                                <div className="flex justify-center w-full py-2 gap-2">
                                    {project.images && project.images?.length > 0 &&
                                        project.images?.map((image: ProjectImage, index: number) => (
                                            <a
                                                key={image.id} id={`item${index + 1}`}
                                                className="btn btn-xs"
                                                onClick={() => setCurrentDisplayImage(image.url, image.caption, true)}
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
                    : <Skeleton isSiteLevel={false} />
            }
            {
                showSlideShow &&
                <Modal customClass="relative pt-3">
                    <MdCancel
                        title="Close slideshow"
                        className="cursor-pointer z-15 text-[30px] text-error hover:text-red-600 absolute top-0 right-0"
                        onClick={() => setShowSlideshow(false)}
                    />
                    {
                        displayImage !== null
                            ?
                            <>
                                <div className="carousel w-full mt-7">
                                    <div className="carousel-item relative w-full flex-col justify-center items-center gap-5">
                                        <div className="bg-black py-2 px-4 w-full">
                                            <h2 className="text-white">{displayImageCaption}</h2>
                                        </div>
                                        <Image src={displayImage}
                                            className="w-full"
                                            unoptimized={true}
                                            height={100}
                                            width={100}
                                            alt={displayImageCaption}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center w-full py-2 gap-2">
                                    {project && project.images && project.images?.length > 0 &&
                                        project.images?.map((image: ProjectImage, index: number) => (
                                            <a
                                                key={image.id} id={`item${index + 1}`}
                                                className="btn btn-xs"
                                                onClick={() => setCurrentDisplayImage(image.url, image.caption, true)}
                                            >
                                                {index + 1}
                                            </a>
                                        ))}
                                </div>
                            </>
                            : <MdImage className="text-success text-[200px] sm:text-[400px] w-[100%] h-[200px] sm:h-[400px]" />
                    }
                </Modal>
            }
        </Layout>
    )
}
