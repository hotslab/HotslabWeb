import { ProjectExtended, ProfileExtended, ProjectSkillExtended, Tag, Skill, ProjectTagExtended, Experience, ProjectExperienceExtended, ProjectImage } from "@prisma/client"
import { useState, useEffect, useCallback } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MdDelete, MdEditSquare, MdAddBox, MdImage } from "react-icons/md"
import { useRouter } from "next/router"
import eventBus from "@/lib/eventBus"
import TinyEditor from "@/components/TinyEditor"

type props = { project: ProjectExtended | null, profile: ProfileExtended, close: Function }

export default function ProjectEdit({ project, profile, close }: props) {
    const [editSection, setEditSection] = useState<string | null>(null)
    const [projectName, setProjectName] = useState(project?.projectName || "")
    const [isOngoing, setIsOngoing] = useState(project ? Boolean(project.isOngoing) : false)
    const [description, setDescription] = useState(project?.description || "")
    const [startDate, setStartDate] = useState(project ? new Date(project.startDate) : new Date())
    const [endDate, setEndDate] = useState(project ? new Date(project.endDate) : new Date())
    const [unlinkedExperiences, setUnlinkedExperiences] = useState<Experience[] | []>([])
    const [unlinkedSkills, setUnlinkedSkills] = useState<Skill[] | []>([])
    const [unlinkedTags, setUnlinkedTags] = useState<Tag[] | []>([])
    const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null)
    const [imageCaption, setImageCaption] = useState<string>("")

    const router = useRouter()

    function openEdit(section: string) {
        setEditSection(section)
    }
    function closeEditSection() {
        setSelectedImage(null)
        setImageCaption("")
        setEditSection(null)
    }
    function openEditImage(projectImage: ProjectImage | null) {
        setEditSection("images")
        setSelectedImage(projectImage)
        if (projectImage) setImageCaption(projectImage.caption)
    }
    function getDisplayImage(url: string): string | null {
        return url ? `'${process.env.NEXT_PUBLIC_HOST}/${url}'` : null
    }
    async function unlinkProjectSkill(projectSkillId: number) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/skill/?id=${projectSkillId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function linkSkill(skill: Skill) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/skill`, {
            body: JSON.stringify({
                skillId: skill.id,
                projectId: project?.id
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function unlinkProjectTag(projectTagId: number) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/tag/?id=${projectTagId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function linkTag(tag: Tag) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/tag`, {
            body: JSON.stringify({
                tagId: tag.id,
                projectId: project?.id
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function unlinkProjectExperience(projectExperienceId: number) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/experience/?id=${projectExperienceId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function linkExperience(experience: Experience) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/experience`, {
            body: JSON.stringify({
                experienceId: experience.id,
                projectId: project?.id
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    const getUnlinkedExperiences = useCallback(async () => {
        if (project && project.id && unlinkedExperiences.length === 0) {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/experience?notProjectId=${project.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                setUnlinkedExperiences((await response.json()).data)
            })
        }
    }, [project, unlinkedExperiences])
    const getUnlinkedTags = useCallback(async () => {
        if (project && project.id && unlinkedTags.length === 0) {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tag?notProjectId=${project.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                setUnlinkedTags((await response.json()).data)
            })
        }
    }, [project, unlinkedTags])
    const getUnlinkedSkills = useCallback(async () => {
        if (project && project.id && unlinkedSkills.length === 0) {
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/skill?notProjectId=${project.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                setUnlinkedSkills((await response.json()).data)
            })
        }
    }, [project, unlinkedSkills])
    async function deleteImage(projectImageId: number) {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/image/?id=${projectImageId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else eventBus.dispatch("openErrorModal", (await response.json()).data)
            eventBus.dispatch("openLoadingPage", false)
        })
    }
    async function saveOrUpdateImage() {
        eventBus.dispatch("openLoadingPage", true)
        let input = document.querySelector('input[type="file"]') as HTMLInputElement
        if (input && input.files && input.files.length) {
            let data = new FormData()
            data.append('file', input.files[0])
            data.append('caption', imageCaption)
            data.append('projectId', String(project?.id || ""))
            data.append('projectImageId', String(selectedImage?.id || ""))
            await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/project/image`, {
                method: 'POST',
                body: data
            }).then(async response => {
                if (response.ok) {
                    setSelectedImage(null)
                    setImageCaption("")
                    router.replace(router.asPath)
                    close()
                }
                else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
        } else {
            eventBus.dispatch("openErrorModal", "File input is empty")
            eventBus.dispatch("openLoadingPage", false)
        }
    }
    async function saveOrUpdate() {
        eventBus.dispatch("openLoadingPage", true)
        await fetch(
            project ? `${process.env.NEXT_PUBLIC_HOST}/api/project/${project.id}` : `${process.env.NEXT_PUBLIC_HOST}/api/project`,
            {
                body: JSON.stringify({
                    projectName: projectName,
                    isOngoing: isOngoing,
                    startDate: startDate,
                    endDate: endDate,
                    description: description,
                    profileId: profile?.id || null
                }),
                method: project ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
            }).then(async response => {
                if (response.ok) { close(), router.replace(router.asPath) }
                else eventBus.dispatch("openErrorModal", (await response.json()).data)
                eventBus.dispatch("openLoadingPage", false)
            })
    }

    useEffect(() => { getUnlinkedExperiences(), getUnlinkedTags(), getUnlinkedSkills() },
        [getUnlinkedExperiences, getUnlinkedTags, getUnlinkedSkills]
    )

    return (
        <div>
            {editSection === null &&
                <div className="w-full">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>{project ? `Update ${project.projectName}` : 'Create Project'}</span>
                            <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => close()}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-sm btn-success text-white"
                                    onClick={() => saveOrUpdate()}
                                >
                                    {project ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Project</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="title"
                                autoComplete="title"
                                className="input input-bordered w-full text-white"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Start Date</span>
                            </label>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                className="input input-bordered w-full text-white"
                                selected={startDate}
                                onChange={(date: Date) => setStartDate(date)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">End Date</span>
                            </label>
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                className="input input-bordered w-full text-white"
                                selected={endDate}
                                onChange={(date: Date) => setEndDate(date)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Description</span>
                            </label>
                            <TinyEditor
                                content={description}
                                onChange={(e: string) => setDescription(e)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Is Ongoing?</span>
                            </label>
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={isOngoing}
                                onChange={(e) => setIsOngoing(isOngoing ? false : true)}
                            />
                        </div>
                    </div>
                    {
                        project &&
                        <div className="mt-10 mb-10">
                            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                                <span>Tags</span>
                                <button
                                    title="Add new skill"
                                    className="btn btn-xs text-white btn-success"
                                    onClick={() => openEdit('tags')}
                                >
                                    Add
                                </button>
                            </dt>
                            <dd className="mt-2">
                                <div className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                    <input type="checkbox" />
                                    <div className="w-full collapse-title text-md font-medium flex justify-between items-center flex-wrap">
                                        <span>Linked Tags List</span>
                                    </div>
                                    <div className="mt-2 collapse-content text-sm">
                                        {
                                            project && project.tags && project.tags.length > 0
                                                ? project.tags.map(
                                                    (projectTag: ProjectTagExtended, index: number, array: ProjectTagExtended[]) => (
                                                        <div key={index} className="py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                                            <div className="w-full sm:w-[90%]">
                                                                {index + 1}. {projectTag.tag.name}
                                                            </div>
                                                            <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                                                <MdDelete
                                                                    title={`Delete ${projectTag.tag.name}`}
                                                                    className="text-error text-2xl cursor-pointer"
                                                                    onClick={() => unlinkProjectTag(projectTag.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                : <div className="text-white w-full text-left">No tags listed</div>
                                        }
                                    </div>
                                </div>
                            </dd>
                        </div>
                    }
                    {
                        project &&
                        <div className="mt-10 mb-10">
                            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                                <span>Experiences</span>
                                <button
                                    title="Add new skill"
                                    className="btn btn-xs text-white btn-success"
                                    onClick={() => openEdit('experiences')}
                                >
                                    Add
                                </button>
                            </dt>
                            <dd className="mt-2">
                                <div className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                    <input type="checkbox" />
                                    <div className="w-full collapse-title text-md font-medium flex justify-between items-center flex-wrap">
                                        <span>Linked Experiences List</span>
                                    </div>
                                    <div className="mt-2 collapse-content text-sm">
                                        {
                                            project && project.experiences && project.experiences.length > 0
                                                ? project.experiences.map(
                                                    (projectExperience: ProjectExperienceExtended, index: number, array: ProjectExperienceExtended[]) => (
                                                        <div key={index} className="py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                                            <div className="w-full sm:w-[90%]">
                                                                {index + 1}. {projectExperience.experience.title}
                                                            </div>
                                                            <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                                                <MdDelete
                                                                    title={`Delete ${projectExperience.experience.title}`}
                                                                    className="text-error text-2xl cursor-pointer"
                                                                    onClick={() => unlinkProjectExperience(projectExperience.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                : <div className="text-white w-full text-left">No experiences listed</div>
                                        }
                                    </div>
                                </div>
                            </dd>
                        </div>
                    }
                    {
                        project &&
                        <div className="mt-10 mb-10">
                            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                                <span>Skills</span>
                                <button
                                    title="Add new skill"
                                    className="btn btn-xs text-white btn-success"
                                    onClick={() => openEdit('skills')}
                                >
                                    Add
                                </button>
                            </dt>
                            <dd className="mt-2">
                                <div className="w-full collapse collapse-arrow border border-base-300 bg-base-100 rounded-box text-white">
                                    <input type="checkbox" />
                                    <div className="w-full collapse-title text-md font-medium flex justify-between items-center flex-wrap">
                                        <span>Linked Skills List</span>
                                    </div>
                                    <div className="mt-2 collapse-content text-sm">
                                        {
                                            project && project.skills && project.skills.length > 0
                                                ? project.skills.map(
                                                    (projectSkill: ProjectSkillExtended, index: number, array: ProjectSkillExtended[]) => (
                                                        <div key={index} className="py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                                            <div className="w-full sm:w-[90%]">
                                                                {index + 1}. {projectSkill.skill.name}
                                                            </div>
                                                            <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                                                <MdDelete
                                                                    title={`Delete ${projectSkill.skill.name}`}
                                                                    className="text-error text-2xl cursor-pointer"
                                                                    onClick={() => unlinkProjectSkill(projectSkill.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))
                                                : <div className="text-white w-full text-left">No skills listed</div>
                                        }
                                    </div>
                                </div>
                            </dd>
                        </div>
                    }
                    {
                        project &&
                        <div className="mt-10 mb-10">
                            <dt className="font-medium text-gray-900 mb-5 flex justify-between items-center flex-wrap gap-3">
                                <span>Images</span>
                                <button
                                    title="Add new image"
                                    className="btn btn-xs text-white btn-success"
                                    onClick={() => openEdit('images')}
                                >
                                    Add
                                </button>
                            </dt>
                            <dd className="mt-2 text-sm text-gray-500 flex justify-center items-center flex-wrap gap-5">
                                {
                                    project && project.images && project.images.length > 0
                                        ? project.images.map(
                                            (projectImage: ProjectImage, index: number, array: ProjectImage[]) => (
                                                <div key={index} className="flex flex-col justify-between items-center w-[300px] bg-base-100 shadow-xl">
                                                    <div className="w-full py-6 px-4 flex gap-5 justify-between items-center flex-wrap">
                                                        <p className="text-lg font-bold text-white">
                                                            {projectImage.caption}
                                                        </p>
                                                        <div className="flex gap-5 justify-end items-center flex-wrap">
                                                            <MdDelete
                                                                title="Delete"
                                                                className="text-error font-bold text-xl cursor-pointer"
                                                                onClick={() => deleteImage(projectImage.id)}
                                                            />
                                                            <MdEditSquare
                                                                title="Edit"
                                                                className="text-success font-bold text-xl cursor-pointer"
                                                                onClick={() => openEditImage(projectImage)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            backgroundImage: `url(${getDisplayImage(projectImage.url)})`,
                                                            backgroundSize: "cover",
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundPosition: "center"
                                                        }}
                                                        className="w-full h-[100px] sm:h-[200px] p-0"
                                                    >
                                                    </div>
                                                </div>
                                            ))
                                        : <div className="text-gray-600 w-full text-left">No images listed</div>
                                }
                            </dd>
                        </div>
                    }
                </div>
            }
            {
                editSection === "skills" &&
                <div className="">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>Link Unlinked Skills</span>
                            <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => closeEditSection()}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                        {

                            unlinkedSkills.map(
                                (skill: Skill, index: number, array: Skill[]) => (
                                    <div key={index} className="w-full py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                        <div className="text-gray-900 w-full sm:w-[90%]">
                                            {index + 1}. {skill.name}
                                        </div>
                                        <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                            <MdAddBox
                                                title={`Link ${skill.name}`}
                                                className="text-success text-2xl"
                                                onClick={() => linkSkill(skill)}
                                            />
                                        </div>
                                    </div>
                                ))
                        }
                    </dd>
                </div>
            }
            {
                editSection === "tags" &&
                <div className="">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>Link Unlinked Tags</span>
                            <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => closeEditSection()}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                        {

                            unlinkedTags.map(
                                (tag: Tag, index: number, array: Tag[]) => (
                                    <div key={index} className="w-full py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                        <div className="text-gray-900 w-full sm:w-[90%]">
                                            {index + 1}. {tag.name}
                                        </div>
                                        <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                            <MdAddBox
                                                title={`Link ${tag.name}`}
                                                className="text-success text-2xl"
                                                onClick={() => linkTag(tag)}
                                            />
                                        </div>
                                    </div>
                                ))
                        }
                    </dd>
                </div>
            }
            {
                editSection === "experiences" &&
                <div className="">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>Link Unlinked Experiences</span>
                            <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => closeEditSection()}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <dd className="mt-2 text-sm text-gray-500 flex justify-start items-center flex-wrap gap-1">
                        {

                            unlinkedExperiences.map(
                                (experience: Experience, index: number, array: Experience[]) => (
                                    <div key={index} className="w-full py-2 flex justify-between items-start gap-5 sm:gap-0 flex-wrap">
                                        <div className="text-gray-900 w-full sm:w-[90%]">
                                            {index + 1}. {experience.title}
                                        </div>
                                        <div className="w-full sm:w-[10%] flex justify-start sm:justify-end items-start">
                                            <MdAddBox
                                                title={`Link ${experience.title}`}
                                                className="text-success text-2xl"
                                                onClick={() => linkExperience(experience)}
                                            />
                                        </div>
                                    </div>
                                ))
                        }
                    </dd>
                </div>
            }
            {
                editSection === "images" &&
                <div className="my-8">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold text-white">
                            <span>Image</span>
                            <div className="flex justify-start sm:justify-end items-center flex-wrap gap-5">
                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => closeEditSection()}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-sm btn-success text-white"
                                    onClick={() => saveOrUpdateImage()}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="px-4 py-6 w-full flex items-center justify-center">
                            {
                                selectedImage !== null
                                    ?
                                    <div
                                        style={{
                                            backgroundImage: `url(${getDisplayImage(selectedImage.url)})`,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center"
                                        }}
                                        className="w-full h-[200px] sm:h-[300px] p-0"
                                    >
                                    </div>
                                    : <MdImage className="text-success text-[200px] sm:text-[300px] w-[100%]" />
                            }
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Image</span>
                            </label>
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg,.svg"
                                className="file-input w-full mb-10 text-white"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Caption</span>
                            </label>
                            <input
                                type="text"
                                name="imageCaption"
                                placeholder="Image caption"
                                autoComplete="imageCaption"
                                className="input input-bordered w-full text-white"
                                value={imageCaption}
                                onChange={(e) => setImageCaption(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}