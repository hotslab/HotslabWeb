import { ProjectExtended, ProfileExtended, ProjectSkillExtended, Tag, Skill, ProjectTagExtended, Experience, ProjectExperienceExtended, ProjectImage } from "@prisma/client";
import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MdDelete, MdEditSquare, MdAddBox, MdImage } from "react-icons/md"
import Image from "next/image";
import { useRouter } from "next/router";

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
        return url ? `'http://localhost:3000/${url}'` : null
    }
    async function unlinkProjectSkill(projectSkillId: number) {
        await fetch(`http://localhost:3000/api/project/skill/?id=${projectSkillId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else console.error(response.body)
        })
    }
    async function linkSkill(skill: Skill) {
        await fetch(`http://localhost:3000/api/project/skill`, {
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
            else console.error(response.body)
        })
    }
    async function unlinkProjectTag(projectTagId: number) {
        await fetch(`http://localhost:3000/api/project/tag/?id=${projectTagId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else console.error(response.body)
        })
    }
    async function linkTag(tag: Tag) {
        await fetch(`http://localhost:3000/api/project/tag`, {
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
            else console.error(response.body)
        })
    }
    async function unlinkProjectExperience(projectExperienceId: number) {
        await fetch(`http://localhost:3000/api/project/experience/?id=${projectExperienceId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else console.error(response.body)
        })
    }
    async function linkExperience(experience: Experience) {
        await fetch(`http://localhost:3000/api/project/experience`, {
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
            else console.error(response.body)
        })
    }
    async function getUnlinkedExperiences() {
        if (project && project.id && unlinkedExperiences.length === 0) {
            await fetch(`http://localhost:3000/api/experience?notProjectId=${project.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                setUnlinkedExperiences((await response.json()).data)
            }).catch(error => console.error(error))
        }
    }
    async function getUnlinkedTags() {
        if (project && project.id && unlinkedExperiences.length === 0) {
            await fetch(`http://localhost:3000/api/tag?notProjectId=${project.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                setUnlinkedTags((await response.json()).data)
            }).catch(error => console.error(error))
        }
    }
    async function getUnlinkedSkills() {
        if (project && project.id && unlinkedExperiences.length === 0) {
            await fetch(`http://localhost:3000/api/skill?notProjectId=${project.id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            }).then(async response => {
                setUnlinkedSkills((await response.json()).data)
            }).catch(error => console.error(error))
        }
    }
    async function deleteImage(projectImageId: number) {
        await fetch(`http://localhost:3000/api/project/image/?id=${projectImageId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        }).then(async response => {
            if (response.ok) { close(), router.replace(router.asPath) }
            else console.error(response.body)
        })
    }
    async function saveOrUpdateImage() {
        let input = document.querySelector('input[type="file"]') as HTMLInputElement
        if (input && input.files && input.files.length) {
            let data = new FormData()
            data.append('file', input.files[0])
            data.append('caption', imageCaption)
            data.append('projectId', String(project?.id || ""))
            data.append('projectImageId', String(selectedImage?.id || ""))
            await fetch(`http://localhost:3000/api/project/image`, {
                method: 'POST',
                body: data
            }).then(response => {
                if (response.ok) {
                    setSelectedImage(null)
                    setImageCaption("")
                    router.replace(router.asPath)
                    close()
                }
                else console.error(response.body)
            })
        } else console.error("File input is empty")
    }
    async function saveOrUpdate() {
        await fetch(
            project ? `http://localhost:3000/api/project/${project.id}` : `http://localhost:3000/api/project`,
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
                close()
            })
            .catch(error => console.error(error))
    }

    useEffect(() => { getUnlinkedExperiences(), getUnlinkedTags(), getUnlinkedSkills() }, [])

    return (
        <div>
            {editSection === null &&
                <div className="w-full">
                    <div className="bg-base-100 mb-5 px-[1.5rem] py-[1rem] flex flex-col gap-3">
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
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
                                className="input input-bordered w-full"
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
                                className="input input-bordered w-full"
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
                                className="input input-bordered w-full"
                                selected={endDate}
                                onChange={(date: Date) => setEndDate(date)}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Description</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="description"
                                className="textarea textarea-bordered"
                                cols={30}
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                                                : <div className="">No tags listed</div>
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
                                                : <div className="">No tags listed</div>
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
                                                : <div className="">No skills listed</div>
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
                                    project && project.images
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
                                                            backgroundImage: `url(${getDisplayImage(projectImage.url)}`,
                                                            backgroundSize: "cover",
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundPosition: "center"
                                                        }}
                                                        className="w-full h-[100px] sm:h-[200px] p-0"
                                                    >
                                                    </div>
                                                </div>
                                            ))
                                        : <span>No images listed</span>
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
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
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
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
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
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
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
                        <div className="flex justify-between items-center flex-wrap gap-3 flex-wrap text-2xl font-bold">
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
                                            backgroundImage: `url(${getDisplayImage(selectedImage.url)}`,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center"
                                        }}
                                        className="w-full h-[200px] sm:h-[400px] p-0"
                                    >
                                    </div>
                                    : <MdImage className="text-success text-[200px] w-[200px] h-[100%]" />
                            }
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-gray-600">Image</span>
                            </label>
                            <input type="file" className="file-input w-full mb-10" />
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
                                className="input input-bordered w-full"
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